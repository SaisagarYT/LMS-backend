const mongoose = require('mongoose');

const referenceSchema = mongoose.Schema({
    author:{type:String,required:true},
    books:{
        type:[String],
        required:true,
        default:[]
    },
    videos:{
        type:[String],
        required:true,
        default:[]
    },
    websites:{
        type:[String],
        required:true,
        default:[]
    }
})

const courseSchema = mongoose.Schema({
    courseThumbnail:{
        type:String,
        required:true,
        unique:true,
    },
    courseName:{
        type:String,
        required:true,
    },
    courseDescription:{
        type:String,
        required:true,
    },
    abstract:{
        type:String,
        required:true,
    },
    bibliography:[referenceSchema],
},{timestamps:true});

module.exports = mongoose.model('Course',courseSchema);