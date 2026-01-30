const Course = require('../models/course.model');

const seedCourses = async (categories) => {
    try {
        // Clear existing courses
        await Course.deleteMany({});
        console.log('✅ Cleared existing courses');

        // Create courses data with category references
        const coursesData = [
            {
                categoryId: categories[0]._id, // Development
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
                enrolledStudents: 0,
                category: 'Development',
            },
        ];

        // Insert courses
        const createdCourses = await Course.insertMany(coursesData);
        console.log(`✅ Created ${createdCourses.length} courses`);

        // Return courses for use in module seeding
        return createdCourses;
    } catch (error) {
        console.error('❌ Error seeding courses:', error);
        throw error;
    }
};

module.exports = seedCourses;
