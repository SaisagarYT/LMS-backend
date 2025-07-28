const mongoose = require('mongoose');

const attendenceSchema = mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true,
    },
    cycleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cycle',
        required:true,
    },
    classNo:{
        type:Number,
        required:true,
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true,
    },
    timeArrive:{
        type:Date,
        required:true,
    },
    timeLeave:{
        type:Date,
        required:true,
    }
})

module.exports = mongoose.model('Attendance',attendenceSchema);