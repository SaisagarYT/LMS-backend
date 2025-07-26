const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true,
    },
    categoryDescrption:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Category',categorySchema);