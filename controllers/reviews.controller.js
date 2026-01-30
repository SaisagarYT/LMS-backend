const Reviews = require('../models/reviews.models');
const Student = require('../models/student.model');

// POST   /api/courses/:courseId/reviews
// GET    /api/courses/:courseId/reviews
// PUT    /api/reviews/:id
// DELETE /api/reviews/:id

const postReview = async(req,res) =>{
    const {userId,rating,comment} = req.body;
    const courseId = req.params.courseId;
    if(!userId){
        return res.status(400).json({
            success:false,
            error:"user not found"
        });
    }
    try{
        const isExist = await Student.findById(userId);
        if(!isExist){
            return res.status(404).json({
                success:false,
                error:"user not found"
            });
        }
        const newpost = new Reviews({
            courseId:courseId,
            studentId:userId,
            rating:rating,
            comment:comment
        });
        await newpost.save();
        return res.status(201).json({
            success:true,
            message:"Review posted successfully",
            review:newpost
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}

const displayAllReviews = async(req,res) =>{
    try{
        const reviews = await Reviews.find().populate('studentId', 'studentName email');
        if(reviews.length == 0){
            return res.status(200).json({
                success:true,
                reviews: [],
                message: "No reviews yet"
            });
        }
        return res.status(200).json({
            success:true,
            reviews
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        });
    }
}

const removePost = async(req,res) =>{
    const {userId,reviewId} = req.body;
    if(!userId || !reviewId){
        return res.status(404).json({
            message:"Credentials are not found!"
        })
    }
    try{
        const review = Reviews.findById({_id:reviewId});
        if(!review || review == null){
            return res.status(404).json({
                success:false,
                error:"no review found"
            });
        }
        await Reviews.deleteById(reviewId);
        return res.status(201).json({
            success:true,
            message:"Review deleted successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        });
    }
}

module.exports = {postReview, displayAllReviews,removePost}
