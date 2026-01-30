const Category = require('../models/category.model');

const categoriesData = [
    { categoryName: 'Development', description: 'Programming and software development courses' },
    { categoryName: 'Design', description: 'UI/UX and graphic design courses' },
    { categoryName: 'Business', description: 'Business and entrepreneurship courses' },
    { categoryName: 'Data Science', description: 'Data analysis and machine learning courses' },
    { categoryName: 'Cloud', description: 'Cloud computing and infrastructure courses' },
    { categoryName: 'Mobile', description: 'Mobile app development courses' },
];

const seedCategories = async () => {
    try {
        // Clear existing categories
        await Category.deleteMany({});
        console.log('✅ Cleared existing categories');

        // Insert categories
        const createdCategories = await Category.insertMany(categoriesData);
        console.log(`✅ Created ${createdCategories.length} categories`);

        // Return categories for use in course seeding
        return createdCategories;
    } catch (error) {
        console.error('❌ Error seeding categories:', error);
        throw error;
    }
};

module.exports = seedCategories;
