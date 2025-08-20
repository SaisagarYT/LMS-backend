const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    studentId:{
        type:String,
        required:true,
        unique:true,
    },
    studentName:{
        type:String,
        required:true,
    },
    studentEmail:{
        type:String,
        required:true,
        unique:true,
    },
    studentPassword:{
        type:String,
        required:true,
    },
    studentBirthDate:{
        type:Date,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    }
},{timestamps:true});
module.exports = mongoose.model('Student',studentSchema);