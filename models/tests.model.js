const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
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
    testDate:{
        type:Date,
        required:true,
    },
    testTime:{
        type:Date,
        required:true,
    },
    agenda:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Test',testSchema);