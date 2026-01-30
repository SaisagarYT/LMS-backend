const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Course = require('./models/course.model');
const Category = require('./models/category.model');
const Module = require('./models/module.model');
const Video = require('./models/video.model');
const Student = require('./models/student.model');
const Enrollment = require('./models/enrollment.model');

dotenv.config();

const categories = [
    { categoryName: 'Development', description: 'Programming and software development courses' },
    { categoryName: 'Design', description: 'UI/UX and graphic design courses' },
    { categoryName: 'Business', description: 'Business and entrepreneurship courses' },
    { categoryName: 'Data Science', description: 'Data analysis and machine learning courses' },
    { categoryName: 'Cloud', description: 'Cloud computing and infrastructure courses' },
    { categoryName: 'Mobile', description: 'Mobile app development courses' },
];

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

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_API);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Category.deleteMany({});
        await Course.deleteMany({});
        await Module.deleteMany({});
        await Video.deleteMany({});
        await Student.deleteMany({});
        await Enrollment.deleteMany({});
        console.log('✅ Cleared existing data');

        // Insert categories
        const createdCategories = await Category.insertMany(categories);
        console.log('✅ Created categories');

        // Create sample courses
        const courses = [
            {
                categoryId: createdCategories[0]._id,
                courseThumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
                courseName: 'Complete React Developer Course',
                courseDescription: 'Master React from the ground up with this comprehensive course covering hooks, state management, and modern patterns.',
                abstract: 'Learn React.js from basics to advanced concepts including hooks, context, Redux, and more.',
                bibliography: [],
                price: 0,
                instructor: 'Dr. Sarah Wilson',
                level: 'Intermediate',
                duration: '24 hours',
                totalLessons: 156,
                rating: 4.9,
                enrolledStudents: 12500,
                category: 'Development',
            },
            {
                categoryId: createdCategories[1]._id,
                courseThumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
                courseName: 'UI/UX Design Fundamentals',
                courseDescription: 'Learn the principles of great design and create stunning user interfaces that delight users.',
                abstract: 'Comprehensive guide to UI/UX design principles, tools, and best practices.',
                bibliography: [],
                price: 49.99,
                instructor: 'Michael Chen',
                level: 'Beginner',
                duration: '18 hours',
                totalLessons: 98,
                rating: 4.8,
                enrolledStudents: 8900,
                category: 'Design',
            },
            {
                categoryId: createdCategories[0]._id,
                courseThumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
                courseName: 'TypeScript Mastery',
                courseDescription: 'Take your JavaScript skills to the next level with TypeScript\'s powerful type system.',
                abstract: 'Advanced TypeScript course covering types, generics, decorators, and more.',
                bibliography: [],
                price: 79.99,
                instructor: 'Emily Davis',
                level: 'Advanced',
                duration: '16 hours',
                totalLessons: 84,
                rating: 4.9,
                category: 'Development',
                enrolledStudents: 6700,
            },
            {
                categoryId: createdCategories[3]._id,
                courseThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
                courseName: 'Data Science with Python',
                courseDescription: 'From data analysis to machine learning - become a data science professional.',
                abstract: 'Comprehensive data science course using Python, pandas, NumPy, and scikit-learn.',
                bibliography: [],
                price: 89.99,
                instructor: 'James Anderson',
                level: 'Intermediate',
                duration: '32 hours',
                totalLessons: 178,
                rating: 4.7,
                category: 'Data Science',
                enrolledStudents: 15200,
            },
            {
                categoryId: createdCategories[4]._id,
                courseThumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
                courseName: 'AWS Cloud Practitioner',
                courseDescription: 'Get certified and master AWS cloud services from scratch.',
                abstract: 'Complete AWS certification preparation course covering all major services.',
                bibliography: [],
                price: 59.99,
                instructor: 'Lisa Wang',
                level: 'Beginner',
                duration: '20 hours',
                totalLessons: 112,
                category: 'Cloud',
                rating: 4.6,
                enrolledStudents: 9800,
            },
            {
                categoryId: createdCategories[5]._id,
                courseThumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
                courseName: 'Mobile App Development with Flutter',
                courseDescription: 'Build beautiful cross-platform mobile apps with Flutter and Dart.',
                abstract: 'Learn Flutter development from basics to advanced concepts.',
                bibliography: [],
                price: 69.99,
                instructor: 'Alex Thompson',
                level: 'Intermediate',
                duration: '28 hours',
                totalLessons: 145,
                category: 'Mobile',
                rating: 4.8,
                enrolledStudents: 11200,
            },
        ];

        const createdCourses = await Course.insertMany(courses);
        console.log('✅ Created sample courses');

        // Create modules for each course
        const modulesData = [];
        
        createdCourses.forEach((course, courseIndex) => {
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
        console.log('✅ Created modules for courses');

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
                });
            }
        });

        await Video.insertMany(videosData);
        // Create sample students
        const hashedPassword = await bcrypt.hash('password123', 10);
        const studentsData = [
            {
                studentId: 'STU001',
                studentName: 'John Doe',
                studentEmail: 'john@example.com',
                studentPassword: hashedPassword,
                studentBirthDate: new Date('1998-05-15'),
                phoneNumber: '+1234567890',
            },
            {
                studentId: 'STU002',
                studentName: 'Jane Smith',
                studentEmail: 'jane@example.com',
                studentPassword: hashedPassword,
                studentBirthDate: new Date('1999-08-22'),
                phoneNumber: '+1234567891',
            },
            {
                studentId: 'STU003',
                studentName: 'Mike Johnson',
                studentEmail: 'mike@example.com',
                studentPassword: hashedPassword,
                studentBirthDate: new Date('1997-12-10'),
                phoneNumber: '+1234567892',
            },
            {
                studentId: 'STU004',
                studentName: 'Sarah Williams',
                studentEmail: 'sarah@example.com',
                studentPassword: hashedPassword,
                studentBirthDate: new Date('2000-03-18'),
                phoneNumber: '+1234567893',
            },
        ];

        const createdStudents = await Student.insertMany(studentsData);
        console.log('✅ Created sample students');

        // Create enrollments - each student enrolled in 1-3 random courses
        const enrollmentsData = [];
        
        createdStudents.forEach((student, studentIndex) => {
            // Randomly enroll in 1-3 courses
            const enrollCount = 1 + (studentIndex % 3);
            
            for (let i = 0; i < enrollCount && i < createdCourses.length; i++) {
                const course = createdCourses[i];
                const courseModules = createdModules.filter(m => m.courseId.toString() === course._id.toString());
                
                // Randomly complete some modules and videos
                const completedModuleIds = [];
                const completedVideoIds = [];
                const completionRate = Math.random() * 0.7; // 0-70% completion
                const modulesToComplete = Math.floor(courseModules.length * completionRate);
                
                for (let j = 0; j < modulesToComplete; j++) {
                    const module = courseModules[j];
                    completedModuleIds.push(module._id);
                    
                    // Also mark videos in this module as completed
                    const moduleVideos = videosData.filter(v => v.moduleId.toString() === module._id.toString());
                    moduleVideos.forEach(video => {
                        completedVideoIds.push(video.moduleId); // Note: using moduleId as placeholder
                    });
                }
                
                const progress = Math.floor((modulesToComplete / courseModules.length) * 100);
                const enrolledDaysAgo = Math.floor(Math.random() * 30) + 1;
                const enrolledDate = new Date();
                enrolledDate.setDate(enrolledDate.getDate() - enrolledDaysAgo);
                
                enrollmentsData.push({
                    studentId: student._id,
                    courseId: course._id,
                    enrolledAt: enrolledDate,
                    progress: progress,
                    completedModules: completedModuleIds,
                    completedVideos: completedVideoIds,
                    lastAccessedAt: new Date(),
                    isCompleted: progress === 100,
                    completedAt: progress === 100 ? new Date() : undefined,
                });
            }
        });

        const createdEnrollments = await Enrollment.insertMany(enrollmentsData);
        console.log('✅ Created enrollments with progress tracking');

        // Update course enrolled students count
        for (const course of createdCourses) {
            const enrollmentCount = enrollmentsData.filter(e => e.courseId.toString() === course._id.toString()).length;
            await Course.findByIdAndUpdate(course._id, { 
                enrolledStudents: course.enrolledStudents + enrollmentCount 
            });
        }
        console.log('✅ Updated course enrollment counts');

        console.log('\n🎉 Database seeded successfully!');
        console.log(`📚 Created ${createdCategories.length} categories`);
        console.log(`📖 Created ${createdCourses.length} courses`);
        console.log(`📦 Created ${createdModules.length} modules`);
        console.log(`🎥 Created ${videosData.length} videos`);
        console.log(`👥 Created ${createdStudents.length} students`);
        console.log(`📝 Created ${createdEnrollments.length} enrollments`);
        console.log('\n📊 Database Relationships:');
        console.log(`   Category → Course (1:Many)`);
        console.log(`   Course → Module (1:Many)`);
        console.log(`   Module → Video (1:Many)`);
        console.log(`   Student → Enrollment (1:Many)`);
        console.log(`   Course → Enrollment (1:Many)`);
        console.log('\n🔐 Test Credentials:');
        console.log(`   Email: john@example.com, jane@example.com, mike@example.com, sarah@example.com`);
        console.log(`   Password: password123urses`);
        console.log(`📦 Created ${createdModules.length} modules`);
        console.log(`🎥 Created ${videosData.length} videos`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
