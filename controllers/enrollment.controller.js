const Enrollment = require('../models/enrollment.model');
const Course = require('../models/course.model');

// Enroll in a course
const enrollCourse = async (req, res) => {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
        return res.status(400).json({ message: "Student ID and Course ID are required" });
    }

    try {
        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }

        // Create enrollment
        const enrollment = new Enrollment({
            studentId,
            courseId,
        });

        await enrollment.save();
        return res.status(201).json({ 
            message: "Successfully enrolled", 
            enrollment 
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Get student enrollments
const getStudentEnrollments = async (req, res) => {
    const { studentId } = req.params;

    try {
        const enrollments = await Enrollment.find({ studentId })
            .populate('courseId')
            .sort({ enrolledAt: -1 });

        return res.status(200).json({ enrollments });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Update progress
const updateProgress = async (req, res) => {
    const { enrollmentId } = req.params;
    const { progress, completedModules, completedVideos, videoProgress } = req.body;

    try {
        const enrollment = await Enrollment.findById(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        if (progress !== undefined) {
            enrollment.progress = Math.min(Math.max(progress, 0), 100);
        }

        if (completedModules) {
            enrollment.completedModules = completedModules;
        }

        if (completedVideos) {
            enrollment.completedVideos = completedVideos;
        }

        // Update video progress map
        if (videoProgress) {
            if (!enrollment.videoProgress) {
                enrollment.videoProgress = new Map();
            }
            Object.keys(videoProgress).forEach(videoId => {
                enrollment.videoProgress.set(videoId, Math.min(Math.max(videoProgress[videoId], 0), 100));
            });
        }

        enrollment.lastAccessedAt = Date.now();

        // Mark as completed if progress is 100%
        if (enrollment.progress === 100 && !enrollment.isCompleted) {
            enrollment.isCompleted = true;
            enrollment.completedAt = Date.now();
        }

        await enrollment.save();

        return res.status(200).json({ 
            message: "Progress updated", 
            enrollment 
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Get enrollment details
const getEnrollmentDetails = async (req, res) => {
    const { studentId, courseId } = req.params;

    try {
        const enrollment = await Enrollment.findOne({ studentId, courseId })
            .populate('courseId')
            .populate('completedModules')
            .populate('completedVideos');

        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        return res.status(200).json({ enrollment });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Unenroll from a course
const unenrollCourse = async (req, res) => {
    const { studentId, courseId } = req.body;

    try {
        const enrollment = await Enrollment.findOneAndDelete({ studentId, courseId });
        
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        return res.status(200).json({ message: "Successfully unenrolled" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    enrollCourse,
    getStudentEnrollments,
    updateProgress,
    getEnrollmentDetails,
    unenrollCourse,
};
