const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Conversation',
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    timestamp:{
        type:Date,
        required:false,
        default:Date.now()
    }
})

module.exports = mongoose.model('Message',messageSchema);