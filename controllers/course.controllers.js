const Course = require('../models/course.model');

const createCourse = async(req,res) =>{
    const {categoryId,courseThumbnail,courseName,courseDescription,abstract,bibliography} = req.body;

    if(courseThumbnail == "" || courseName == "" || courseDescription == "" || abstract == "" || bibliography == ""){
        return res.status(302).json({message:"Enter all the course details"});
    }
    try{
        const isExist = await Course.findOne({courseThumbnail});
        if(isExist){
            return res.status(400).json({message:"Course already exist in Database"});
        }
        const newCourse = await Course.create({
            categoryId:categoryId,
            courseThumbnail:courseThumbnail,
            courseName:courseName,
            courseDescription:courseDescription,
            abstract:abstract,
            bibliography:bibliography
        });
        return res.status(200).json(newCourse);
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const removeCourse = async(req,res) =>{
    const courseId = req.params.courseId;
    try{
        if(!courseId){
            return res.status(303).json({message:"No course id was found!"});
        }
        const deletedCourse = await Course.findByIdAndDelete(courseId);   
        if(!deletedCourse){
            return res.status(400).json({message:"Course not found in the databse"});
        }
        return res.status(200).json({message:"Course removed successfully"});
    }
    catch(err){
        return res.status(500).json({error:err});
    }
}

const updateCourse = async(req,res) =>{
    const {courseId} = req.params;
    const {courseThumbnail,courseName,courseDescription,abstract,bibliography} = req.body;
    if(courseThumbnail === "" || courseName === "" || courseDescription === "" || abstract === "" || bibliography === ""){
        return res.status(400).json({message:"Fields are empty"});
    }
    const updateCourse = {
        courseThumbnail,
        courseName,
        courseDescription,
        abstract,
        bibliography
    };
    try{
        if(courseId === "" || !courseId){
            return res.status(303).json({message:"No courseId was found"});
        }
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({message:"Course not found in DB"});
        }
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {$set:updateCourse},
            {new:true},
        );
        if(!updatedCourse){
            return res.status(400).json({message:"Couorse not updated"});
        }
        return res.status(200).json({message:"course successfully updated",update:updatedCourse});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const displayCourses = async(req,res) =>{
    try{
        const courses = await Course.find().populate('categoryId');
        if(!courses || courses.length == 0){
            return res.status(404).json({message:"No courses are present in DB", courses: []});
        }
        return res.status(200).json({courses});
    }
    catch(err){
        console.error('Error fetching courses:', err);
        return res.status(500).json({error: err.message || "Internal server error"});
    }
}

const getCourseById = async(req,res) =>{
    const {id} = req.params;
    try{
        const course = await Course.findById(id);
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }
        return res.status(200).json({course});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const fetchCourseAccordingToCategory = async(req,res) =>{
    const {categoryId} = req.body;
    if(!categoryId){
        return res.status(404).json({message:"Provide the categoryId"});
    }
    try{
        const courses = await Course.find({categoryId:categoryId});
        if(!courses){
            return res.status(400).json({message:"No course found with this category!"});
        }
        return res.status(200).json(courses);
    }
    catch(err){
        return res.status(500).json({Error:"Internal server error"});
    }
}

module.exports = {createCourse,removeCourse,displayCourses,updateCourse,fetchCourseAccordingToCategory,getCourseById};