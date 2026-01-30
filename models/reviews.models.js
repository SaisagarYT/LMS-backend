const mongooe = require('mongoose');

const reviewSchema = mongooe.Schema({
    courseId:{
        type:mongooe.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    studentId:{
        type:mongooe.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports = mongooe.model('Review',reviewSchema);