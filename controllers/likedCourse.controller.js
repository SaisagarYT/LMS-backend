const LikedCourse = require('../models/likedCourse.model');
const Course = require('../models/course.model');

const addLikedCourses = async(req,res) =>{
    const {courseId,courseIsLiked} = req.body;
    try{
        const response = await LikedCourse.findOne({courseId});
        if(response){
            return res.status(400).json({message:"The course already present in the DB"});
        }
        const likedCourse = await LikedCourse.create({
            courseId:courseId,
            courseIsLiked:courseIsLiked
        });
        return res.status(200).json({message:"Course is added to like list",likedCourse});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error in likedcourse"});
    }
}

const removeLikedCourse = async(req,res) =>{
    const {courseId} = req.body;

    try{
        const course = await LikedCourse.findById(courseId);
        if(!course){
            return res.status(400).json({message:"The course not found"});
        }
        await LikedCourse.findOneAndDelete(course);
        return res.status(200).json({message:"Successfully deleted"});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const showLikedCoure = async(req,res) =>{
    try{
        const likedCourse = await LikedCourse.find();
        if(!likedCourse || likedCourse.length === 0){
            return res.status(400).json({message:"No courses are present in the list"});
        }
        return res.status(200).json({likedCourse});
    }
    catch(err){
        return req.status(500).json({message:"Internal server error at showLikedCourse"});
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
module.exports = {addLikedCourses,showLikedCoure,collectLikedCourse,removeLikedCourse};