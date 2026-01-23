const Module = require('../models/module.model');
const Course = require('../models/course.model');

const createModule = async(req,res) =>{
    const {courseId,title,description,order,duration,isPreview} = req.body;
    if(!courseId || !title || !description || order===undefined || !duration){
        return res.status(404).json({message:"Incomplete module credentials"});
    }
    try{
        const modules = await Module.findOne({title,courseId});
        if(modules){
            return res.status(400).json({message:"Module already exists!"});
        }
        const newModule = new Module({
            courseId:courseId,
            title:title,
            description:description,
            order:order,
            duration:duration,
            isPreview:isPreview
        });
        await newModule.save();
        return res.status(200).json(newModule);
    }
    catch(err){
        return res.status(500).json({Error:err.message});
    }
}

// const deleteModule = async(req,res) =>{
//     const modeuleId = req.body;
//     if(!modeuleId){
//         return res.status(404).json({
//             success:false,
//             message:"Module ID is required"
//         });
//     }
//     try{
//         const course = await Course.findById({modeuleId});
//         if(!course){
//             return res.status()
//         }
//     }
//     catch(err){
//         return res.status()
//     }
// }

const displayModuleBasedOnCourseId = async(req,res) =>{
    const courseId = req.params.courseId;
    try{
        const modules = await Module.find({courseId});
        if(modules.length == 0 || !modules){
            return res.status(400).json({message:"No module was found in the DB"});
        }
        return res.status(200).json(modules);
    }
    catch(err){
        return res.status(500).json({Error:err.message});
    }
}

module.exports = {createModule,displayModuleBasedOnCourseId};