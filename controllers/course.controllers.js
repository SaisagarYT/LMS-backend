const Course = require('../models/course.model');

const createCourse = async(req,res) =>{
    const {courseThumbnail,courseName,courseDescription,abstract,bibliography} = req.body;

    if(courseThumbnail == "" || courseName == "" || courseDescription == "" || abstract == "" || bibliography == ""){
        return res.status(302).json({message:"Enter all the course details"});
    }
    try{
        const isExist = await Course.findOne({courseThumbnail});
        if(isExist){
            return res.status(400).json({message:"Course already exist in Database"});
        }
        const newCourse = await Course.create({
            courseThumbnail:courseThumbnail,
            courseName:courseName,
            courseDescription:courseDescription,
            abstract:abstract,
            bibliography:bibliography
        });
        return res.status(200).json(newCourse);
    }
    catch(err){
        return res.status(500).json({error:err});
    }
}

const removeCourse = async(req,res) =>{
    const {courseName} = req.body;

    try{
        if(courseName == ""){
            return res.status(303).json({message:"Provide the course name"});
        }
        const isExist = await Course.find({courseName});
        if(!isExist){
            return res.status(400).json({message:"Course not found in the databse"});
        }
        await Course.findOneAndDelete(isExist);
        return res.status(200).json({message:"Course removed successfully"});
    }
    catch(err){
        return res.status(500).json({error:err});
    }
}

const displayCourses = async(req,res) =>{
    try{
        const courses = await Course.find();
        if(!courses || courses.length == 0){
            return res.status(400).json({message:"No courses are present in DB"});
        }
        return res.status(200).json({courses});
    }
    catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

module.exports = {createCourse,removeCourse,displayCourses};