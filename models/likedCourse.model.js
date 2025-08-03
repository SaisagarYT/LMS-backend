const mongoose = require('mongoose');

const likedCourseSchema = mongoose.Schema({
  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  courseIsLiked:{
    type:Boolean,
    default:true,
    required:false
  },
},{timestamps:true});

module.exports = mongoose.model('LikedCourse',likedCourseSchema);
