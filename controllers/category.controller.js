const Category = require('../models/category.model');

const addNewCategory = async(req,res) =>{
    const {categoryName} = req.body;
    try{
        const response = await Category.findOne({categoryName:categoryName});
        if(response){
            return res.status(400).json({message:"The category already exist in the DB"});
        }
        const newCategory = new Category({
            categoryName:categoryName,
        });
        await newCategory.save();
        return res.status(200).json({newCategory});
    }
    catch(err){
        return res.status(500).json({Error:err.message});
    }
}

const removeCategory = async(req,res) =>{
    const {categoryId} = req.body;
    try{
        const category = await Category.findById(categoryId);
        if(!category){
            return res.status(400).json({message:"No category exists in the DB"});
        }
        await Category.findByIdAndDelete(categoryId);
        return res.status(200).json({message:"Deleted successfully"});
    }
    catch(err){
        return res.status(500).json({Error:err.message})
    }
}

const getCategoryDetails = async(req,res) =>{
    try{
        const category = await Category.find();
        if(!category){3
            return res.status(400).json({message:"No course found!"});
        }
        return res.status(200).json(category);
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
module.exports = {addNewCategory,removeCategory,getCategoryDetails};