const mongoose = require('mongoose');

const progressSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    videoId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    watchedDuration:{
        type:Number,
        required:true,
    },
    isCompleted:{
        type:String,
        required:true,
    },
    lastWatchedAt:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Progress',progressSchema);