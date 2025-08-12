const mongoose = require('mongoose');

const instructorSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    socialLinks:{
        type:[
            {
                socialName:{
                    type:String,
                    required:true,
                },
                socialUrl:{
                    type:String,
                    required:true,
                }
            }
        ]
    }
})

module.exports = mongoose.model('Instructor',instructorSchema);