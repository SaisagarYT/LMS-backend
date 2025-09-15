const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    pdf:{
        type:String,
        required:true,
    },
    fileUrl:{
        type:String,
        required:true,
    },
    fileType:{
        type:String,
        required:true,
    }
},{_id:false})

const videoSchema = mongoose.Schema({
    moduleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Module",
        required:true,
    },
    title:{
        type:String,
        required:true,     
    },
    description:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    thumbnailUrl:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    isFree:{
        type:Boolean,
        required:true,
    },
    order:{
        type:Number,
        required:true,
    },
    transcription:{
        type:String,
    },
    resources:{
        type:[fileSchema],
    }
},{timestamps:true});

module.exports = mongoose.model('Video',videoSchema);