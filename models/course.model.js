const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
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
    bibliography:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Course',courseSchema);