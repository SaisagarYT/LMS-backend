const mongoose = require('mongoose');

const testScoreSchema = mongoose.Schema({
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
    testNo:{
        type:Number,
        required:true,
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true,
    },
    score:{
        type:Double,
        required:true,
    }
})

module.exports = mongoose.model('TestScore',testScoreSchema);