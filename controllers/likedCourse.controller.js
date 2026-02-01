const LikedCourse = require('../models/likedCourse.model');
const Course = require('../models/course.model');

const addLikedCourses = async(req,res) =>{
    const {studentId, courseId} = req.body;
    try{
        if (!studentId || !courseId) {
            return res.status(400).json({message:"StudentId and CourseId are required"});
        }

        const response = await LikedCourse.findOne({studentId, courseId});
        if(response){
            return res.status(400).json({message:"The course is already liked by this student"});
        }
        const likedCourse = await LikedCourse.create({ 
            studentId,
            courseId,
        });
        return res.status(200).json({likedCourse, message: "Course liked successfully"});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error in likedcourse", error: err.message});
    }
}

const removeLikedCourse = async(req,res) =>{
    const {studentId, courseId} = req.body;
    try{
        if (!studentId || !courseId) {
            return res.status(400).json({message:"StudentId and CourseId are required"});
        }

        const course = await LikedCourse.findOne({studentId, courseId});
        if(!course){
            return res.status(400).json({message:"The liked course not found"});
        }
        await LikedCourse.findOneAndDelete({studentId, courseId});
        return res.status(200).json({message:"Successfully removed from liked courses"});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const showLikedCourse = async(req,res) =>{
    const {studentId} = req.query;
    try{
        if (!studentId) {
            return res.status(400).json({message:"StudentId is required"});
        }

        const likedCourses = await LikedCourse.find({studentId}).populate('courseId');
        return res.status(200).json({likedCourses, count: likedCourses.length});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error at showLikedCourse", error: err.message});
    }
}

const checkIfLiked = async(req,res) =>{
    const {studentId, courseId} = req.query;
    try{
        if (!studentId || !courseId) {
            return res.status(400).json({message:"StudentId and CourseId are required"});
        }

        const liked = await LikedCourse.findOne({studentId, courseId});
        return res.status(200).json({isLiked: !!liked});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error", error: err.message});
    }
}

const collectLikedCourse = async(req,res) =>{
    const {courseId} = req.body;
    try{
        const courses = await Course.find({_id:courseId});
        if(!courses){
            return res.status(400).json({message:"Courses not found in the liked list"});
        }
        return res.status(200).json({courses});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

module.exports = {addLikedCourses,showLikedCourse,collectLikedCourse,removeLikedCourse,checkIfLiked};