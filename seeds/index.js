const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import seed functions
const seedCategories = require('./seed-categories');
const seedCourses = require('./seed-courses');
const seedModules = require('./seed-modules');
const seedEnrollments = require('./seed-enrollments');

dotenv.config();

const runAllSeeds = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_API);
        console.log('✅ Connected to MongoDB\n');

        console.log('🌱 Starting database seeding...\n');

        // Step 1: Seed Categories
        console.log('📚 Step 1: Seeding Categories...');
        const categories = await seedCategories();
        console.log('');

        // Step 2: Seed Courses (depends on categories)
        console.log('📖 Step 2: Seeding Courses...');
        const courses = await seedCourses(categories);
        console.log('');

        // Step 3: Seed Modules and Videos (depends on courses)
        console.log('📦 Step 3: Seeding Modules and Videos...');
        const { modules, videos } = await seedModules(courses);
        console.log('');

        // Step 4: Seed Students and Enrollments (depends on courses and modules)
        console.log('👥 Step 4: Seeding Students and Enrollments...');
        const { students, enrollments } = await seedEnrollments(courses, modules);
        console.log('');

        // Summary
        console.log('═══════════════════════════════════════════════════════');
        console.log('DATABASE SEEDING COMPLETED SUCCESSFULLY!');
        console.log('═══════════════════════════════════════════════════════');
        console.log(`Summary:`);
        console.log(`   Categories: ${categories.length}`);
        console.log(`   Courses: ${courses.length}`);
        console.log(`   Modules: ${modules.length}`);
        console.log(`   Videos: ${videos.length}`);
        console.log(`   Students: ${students.length}`);
        console.log(`   Enrollments: ${enrollments.length}`);
        console.log('');
        console.log('Database Relationships:');
        console.log('   Category → Course (1:Many)');
        console.log('   Course → Module (1:Many)');
        console.log('   Module → Video (1:Many)');
        console.log('   Student → Enrollment (1:Many)');
        console.log('   Course → Enrollment (1:Many)');
        console.log('');
        console.log('Test Credentials:');
        console.log('   Email: john@example.com');
        console.log('   Email: jane@example.com');
        console.log('   Email: mike@example.com');
        console.log('   Email: sarah@example.com');
        console.log('   Password: password123 (for all)');
        console.log('═══════════════════════════════════════════════════════\n');
        
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error running seeds:', error);
        process.exit(1);
    }
};

// Run all seeds
runAllSeeds();
