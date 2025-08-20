const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    order:{
        type:Number,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    isPreview:{
        type:Boolean,
        required:true,
    },
},{timestamps:true})

module.exports = mongoose.model('Module',moduleSchema);