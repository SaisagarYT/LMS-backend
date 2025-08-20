const Module = require('../models/module.model');

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

module.exports = {createModule}