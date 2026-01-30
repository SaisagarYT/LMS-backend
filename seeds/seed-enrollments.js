const bcrypt = require('bcrypt');
const Student = require('../models/student.model');
const Enrollment = require('../models/enrollment.model');
const Course = require('../models/course.model');

const seedEnrollments = async (courses, modules) => {
    try {
        // Clear existing students and enrollments
        await Student.deleteMany({});
        await Enrollment.deleteMany({});
        console.log('✅ Cleared existing students and enrollments');

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
        console.log(`✅ Created ${createdStudents.length} students`);

        // Create enrollments - each student enrolled in 1-3 random courses
        const enrollmentsData = [];
        
        createdStudents.forEach((student, studentIndex) => {
            // Randomly enroll in 1-3 courses
            const enrollCount = 1 + (studentIndex % 3);
            
            for (let i = 0; i < enrollCount && i < courses.length; i++) {
                const course = courses[i];
                const courseModules = modules.filter(m => m.courseId.toString() === course._id.toString());
                
                // Randomly complete some modules and videos
                const completedModuleIds = [];
                const completedVideoIds = [];
                const completionRate = Math.random() * 0.7; // 0-70% completion
                const modulesToComplete = Math.floor(courseModules.length * completionRate);
                
                for (let j = 0; j < modulesToComplete; j++) {
                    const module = courseModules[j];
                    completedModuleIds.push(module._id);
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
        console.log(`✅ Created ${createdEnrollments.length} enrollments`);

        // Update course enrolled students count
        for (const course of courses) {
            const enrollmentCount = enrollmentsData.filter(e => e.courseId.toString() === course._id.toString()).length;
            await Course.findByIdAndUpdate(course._id, { 
                enrolledStudents: course.enrolledStudents + enrollmentCount 
            });
        }
        console.log('✅ Updated course enrollment counts');

        return { students: createdStudents, enrollments: createdEnrollments };
    } catch (error) {
        console.error('❌ Error seeding enrollments:', error);
        throw error;
    }
};

module.exports = seedEnrollments;
