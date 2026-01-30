const mongoose = require('mongoose');

const referenceSchema = mongoose.Schema({
    author:{type:String,required:true},
    techStack:{
        type:[String],
        requied:true,
        default:'Theory'
    },
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
});

const courseSchema = mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
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
    bibliography:{referenceSchema},
    price:{
        type:Number,
        default:49
    },
    instructor:{
        type:String,
        default:"Unknown Instructor"
    },
    level:{
        type:String,
        enum:['Beginner','Intermediate','Advanced'],
        default:'Beginner'
    },
    duration:{
        type:String,
        default:"10 hours"
    },
    totalLessons:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    enrolledStudents:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        default:"Other"
    }
},{timestamps:true});

module.exports = mongoose.model('Course',courseSchema);