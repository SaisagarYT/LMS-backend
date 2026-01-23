const Video = require('../models/video.model');

const createVideo = async(req,res) =>{
    const {moduleId,title,description,videoUrl,thumbnailUrl,duration,isFree,order,transcription,resources} = req.body;
    if(!moduleId || !title || !description || !videoUrl || !thumbnailUrl || !duration || !resources || resources.length == 0){
        return res.status(400).json({message:"Details are not filled completely"});
    }
    try{
        const video = await Video.findOne({moduleId,title});
        if(video){
            return res.status(400).json({message:"video already exists in DB"});
        }
        const newVideo = new Video({
            moduleId:moduleId,
            title:title,
            description:description,
            videoUrl:videoUrl,
            thumbnailUrl:thumbnailUrl,
            duration:duration,
            isFree:isFree,
            order:order,
            transcription:transcription,
            resources:resources,
        });
        await newVideo.save();
        return res.status(200).json(newVideo);
    }
    catch(err){
        return res.status(500).json({Error:err.message});
    }
}



const getVideoBasedOnModule = async(req,res) =>{
    const {moduleId} = req.body;
    try{
        const video = await Video.find({moduleId});
        if(moduleId == null || moduleId == undefined){
            return res.status(404).json({message:moduleId});
        }
        if(!video){
            return res.status(400).json({message:"No video present the module"});
        }
        return res.status(200).json(video);
    }
    catch(err){
        return res.status(500).json({Error:"Internal server error"});
    }
}

module.exports = {createVideo,getVideoBasedOnModule}