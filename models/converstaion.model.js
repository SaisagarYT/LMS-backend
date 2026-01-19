const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    title:{
        type:String,
        required:true,
    }
    // messages: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Message',
    //     }
    // ]
});

module.exports = mongoose.model('Conversation', conversationSchema);
