const mongoose = require('mongoose');

const enrollmentSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    completedModules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
    }],
    completedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    }],
    videoProgress: {
        type: Map,
        of: Number,
        default: new Map(),
    },
    lastAccessedAt: {
        type: Date,
        default: Date.now,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
    }
}, { timestamps: true });

// Compound index to ensure one enrollment per student per course
enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
