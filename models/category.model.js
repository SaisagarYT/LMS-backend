const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true,
    },
    categoryName:{
        type:String,
        required:true,
    },
    categoryDescrption:{
        type:String,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model('Category',categorySchema);