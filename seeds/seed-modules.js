const Module = require('../models/module.model');
const Video = require('../models/video.model');

// Helper functions to generate dynamic content
const getModuleTitle = (courseName, moduleNumber) => {
    const titles = {
        1: 'Introduction & Getting Started',
        2: 'Core Concepts & Fundamentals',
        3: 'Advanced Techniques',
        4: 'Best Practices & Patterns',
        5: 'Real-World Projects',
    };
    return titles[moduleNumber] || 'Advanced Topics';
};

const getModuleDescription = (courseName, moduleNumber) => {
    const descriptions = {
        1: 'the basics and setup your development environment',
        2: 'the core concepts and fundamental principles',
        3: 'advanced techniques and professional workflows',
        4: 'industry best practices and design patterns',
        5: 'building real-world applications and projects',
    };
    return descriptions[moduleNumber] || 'advanced topics and techniques';
};

const getVideoTitle = (moduleTitle, videoNumber) => {
    const topics = [
        'Introduction & Overview',
        'Key Concepts Explained',
        'Hands-on Tutorial',
        'Common Patterns',
        'Best Practices',
    ];
    return topics[videoNumber - 1] || `Topic ${videoNumber}`;
};

const getVideoDescription = (moduleTitle, videoNumber) => {
    const descriptions = [
        'introduction and overview of key concepts',
        'detailed explanation with examples',
        'step-by-step implementation guide',
        'common patterns and use cases',
        'best practices and tips',
    ];
    return descriptions[videoNumber - 1] || 'important concepts';
};

const seedModules = async (courses) => {
    try {
        // Clear existing modules and videos
        await Module.deleteMany({});
        await Video.deleteMany({});
        console.log('✅ Cleared existing modules and videos');

        // Create modules for each course
        const modulesData = [];
        
        courses.forEach((course, courseIndex) => {
            const moduleCount = courseIndex % 2 === 0 ? 5 : 4; // Vary module count
            
            for (let i = 1; i <= moduleCount; i++) {
                modulesData.push({
                    courseId: course._id,
                    title: `Module ${i}: ${getModuleTitle(course.courseName, i)}`,
                    description: `In this module, you'll learn about ${getModuleDescription(course.courseName, i)}`,
                    order: i,
                    duration: `${2 + i}h ${i * 10}m`,
                    isPreview: i === 1, // First module is preview
                });
            }
        });

        const createdModules = await Module.insertMany(modulesData);
        console.log(`✅ Created ${createdModules.length} modules`);

        // Create videos for each module
        const videosData = [];
        
        createdModules.forEach((module, moduleIndex) => {
            const videoCount = 3 + (moduleIndex % 3); // 3-5 videos per module
            
            for (let i = 1; i <= videoCount; i++) {
                videosData.push({
                    moduleId: module._id,
                    title: `Lesson ${i}: ${getVideoTitle(module.title, i)}`,
                    description: `Detailed lesson covering ${getVideoDescription(module.title, i)}`,
                    videoUrl: `https://example.com/videos/module-${moduleIndex}-video-${i}.mp4`,
                    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop',
                    duration: `${5 + i * 2} minutes`,
                    order: i,
                    isFree: module.isPreview && i === 1, // First video of first module is free
                    transcription: `Transcription for lesson ${i}`,
                    resources: [
                        {
                            pdf: `Lesson ${i} Notes`,
                            fileUrl: `https://example.com/resources/lesson-${i}-notes.pdf`,
                            fileType: 'pdf'
                        }
                    ],
                });
            }
        });

        await Video.insertMany(videosData);
        console.log(`✅ Created ${videosData.length} videos`);

        // Return modules for use in enrollment seeding
        return { modules: createdModules, videos: videosData };
    } catch (error) {
        console.error('❌ Error seeding modules:', error);
        throw error;
    }
};

module.exports = seedModules;
