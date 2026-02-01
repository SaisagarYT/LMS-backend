const mongoose = require('mongoose');

const likedCourseSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required:true,
  },
  courseIsLiked:{
    type:Boolean,
    default:true,
    required:false
  },
},{timestamps:true});

// Compound index to prevent duplicate likes from same student
likedCourseSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('LikedCourse',likedCourseSchema);
