const mongoose = require('mongoose');

const chatgptSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Chat',chatgptSchema);