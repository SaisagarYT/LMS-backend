# Database Seeding System

This folder contains modular seed files for the LMS database. Each seed file is responsible for one collection and maintains proper relationships with other collections.

## 📁 Seed Files

### 1. `seed-categories.js`
- **Collection:** `categories`
- **Dependencies:** None
- **Creates:** 6 categories (Development, Design, Business, Data Science, Cloud, Mobile)
- **Returns:** Array of created category documents with IDs

### 2. `seed-courses.js`
- **Collection:** `courses`
- **Dependencies:** Categories (requires category IDs)
- **Creates:** 6 courses with category references
- **Returns:** Array of created course documents with IDs

### 3. `seed-modules.js`
- **Collection:** `modules`, `videos`
- **Dependencies:** Courses (requires course IDs)
- **Creates:** 27 modules and 108 videos with course/module references
- **Returns:** Object with modules and videos arrays

### 4. `seed-enrollments.js`
- **Collection:** `enrollments`, `students`
- **Dependencies:** Courses and Modules (requires IDs for progress tracking)
- **Creates:** 4 students and 7 enrollments with progress tracking
- **Returns:** Object with students and enrollments arrays

### 5. `index.js`
- **Main orchestrator** that runs all seeds in the correct order
- Manages data flow between seed files
- Provides comprehensive summary

## 🚀 Usage

### Run All Seeds (Recommended)
```bash
npm run seed
```
This will:
1. Clear all existing data
2. Seed categories
3. Seed courses (using category IDs)
4. Seed modules and videos (using course IDs)
5. Seed students and enrollments (using course and module IDs)

### Run Individual Seeds (For Testing)
```bash
# Note: Running individual seeds may break relationships
# Only use for testing specific collections

npm run seed:categories
npm run seed:courses
npm run seed:modules
npm run seed:enrollments
```

### Alternative: Direct Node Execution
```bash
# Run all seeds
node seeds/index.js

# Run individual seed (must be in order to maintain relationships)
node seeds/seed-categories.js
node seeds/seed-courses.js
node seeds/seed-modules.js
node seeds/seed-enrollments.js
```

## 📊 Data Flow

```
┌─────────────────┐
│   Categories    │
└────────┬────────┘
         │ IDs passed down
         ▼
┌─────────────────┐
│     Courses     │
└────────┬────────┘
         │ IDs passed down
         ▼
┌─────────────────┐
│     Modules     │
│     Videos      │
└────────┬────────┘
         │ IDs passed down
         ▼
┌─────────────────┐
│   Enrollments   │
│    Students     │
└─────────────────┘
```

## 🔗 Relationships Maintained

1. **Category → Course**: Each course has `categoryId` referencing a category
2. **Course → Module**: Each module has `courseId` referencing a course
3. **Module → Video**: Each video has `moduleId` referencing a module
4. **Student → Enrollment**: Each enrollment has `studentId` referencing a student
5. **Course → Enrollment**: Each enrollment has `courseId` referencing a course
6. **Enrollment → Modules**: Tracks completed modules via `completedModules` array

## 📝 Test Data Created

### Categories (6)
- Development
- Design
- Business
- Data Science
- Cloud
- Mobile

### Courses (6)
1. Complete React Developer Course
2. UI/UX Design Fundamentals
3. TypeScript Mastery
4. Data Science with Python
5. AWS Cloud Practitioner
6. Mobile App Development with Flutter

### Modules (27)
- 4-5 modules per course
- Each module has title, description, duration, and order

### Videos (108)
- 3-5 videos per module
- Each video has title, description, URL, thumbnail, and resources

### Students (4)
- John Doe (john@example.com)
- Jane Smith (jane@example.com)
- Mike Johnson (mike@example.com)
- Sarah Williams (sarah@example.com)
- Password: password123 (for all)

### Enrollments (7)
- Random enrollments with 0-70% progress
- Tracks completed modules and videos
- Includes enrollment date and last accessed date

## 🎯 Benefits of Modular Seeds

1. **Maintainability**: Each seed file is focused on one collection
2. **Reusability**: Can run individual seeds for testing
3. **Scalability**: Easy to add new seed files
4. **Clear Dependencies**: Explicit data flow between collections
5. **Type Safety**: Each seed exports data for next seed to use
6. **Error Isolation**: Errors in one seed don't affect others
7. **Testing**: Can test individual collections separately

## ⚠️ Important Notes

- **Order Matters**: Seeds must run in this order: Categories → Courses → Modules → Enrollments
- **ID Dependencies**: Each seed depends on IDs from previous seeds
- **Data Cleared**: Running seeds will delete existing data in all collections
- **MongoDB Connection**: Ensure MONGODB_API is set in `.env` file
- **Bcrypt**: Passwords are hashed using bcrypt with 10 salt rounds

## 🔧 Customization

To modify seed data:

1. **Categories**: Edit `categoriesData` array in `seed-categories.js`
2. **Courses**: Edit `coursesData` array in `seed-courses.js`
3. **Modules**: Modify helper functions or module count logic in `seed-modules.js`
4. **Students**: Edit `studentsData` array in `seed-enrollments.js`
5. **Enrollments**: Adjust enrollment count or completion rate logic

## 📦 Output Example

```
✅ Connected to MongoDB

🌱 Starting database seeding...

📚 Step 1: Seeding Categories...
✅ Cleared existing categories
✅ Created 6 categories

📖 Step 2: Seeding Courses...
✅ Cleared existing courses
✅ Created 6 courses

📦 Step 3: Seeding Modules and Videos...
✅ Cleared existing modules and videos
✅ Created 27 modules
✅ Created 108 videos

👥 Step 4: Seeding Students and Enrollments...
✅ Cleared existing students and enrollments
✅ Created 4 students
✅ Created 7 enrollments
✅ Updated course enrollment counts

🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!
```
