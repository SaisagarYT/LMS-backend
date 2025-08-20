const generateToken = require('../../../Ecommarce/E-commerce/ecommerce-backend/utils/generateToken');
const userAuthentication = require('../auth/authentication');
const Students = require('../models/student.model');
const bcrypt = require('bcrypt');

const registerStudent = async(req,res) =>{
    const {studentId,studentName,studentEmail,studentPassword,studentBirthDate,phoneNumber} = req.body;
    if(studentId == '' || studentName == '' || studentEmail == "" || studentPassword == "" || studentBirthDate == "" || phoneNumber == ""){
        return res.status(300).json({message:"Insufficient user credentials"});
    }
    try{
        const student = await Students.findOne({studentEmail:studentEmail});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(studentPassword,salt);

        if(student){
            return res.status(400).json({message:"Student Already exists"});
        }
        const newStudent = new Students({
            studentId:studentId,
            studentName:studentName,
            studentEmail:studentEmail,
            studentPassword:hashedPassword,
            studentBirthDate: new Date(studentBirthDate),
            phoneNumber:phoneNumber,
        });
        await newStudent.save();
        if(newStudent){
            return res.status(200).json({newStudent,token:generateToken(newStudent.id)});
        }
        return res.status(200).json({message:"Student registered successfully"});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const signInStudent = async(req,res) =>{
    const {studentEmail,studentPassword} = req.body;
    if(studentEmail == "" || studentPassword == ""){
        return res.status(300).json({message:"Insufficient user credentials"});
    }
    try{
        const student = await Students.findOne({studentEmail});
        if(!student){
            return res.status(400).json({message:"User not exist in the DB"});
        }
        if(student && await bcrypt.compare(studentPassword, student.studentPassword)){
            return res.status(200).json({student,token:generateToken(student.id)});
        }
        return res.status(402).json({message:"User credentials are incorrect!"});
    }
    catch(err){
        return res.status(500).json({error:"Internal server error at signin"});
    }
}

const getAllStudents = async(req,res) =>{
    try{
        const student = await Students.find();
        if(!student){
            return res.status(400).json({message:"No students are found"});
        }
        return res.status(200).json({student});
    }
    catch(err){
        return res.status(500).json({error:"Internal server error in getuser"});
    }
}

const studentDetails = async(req,res) =>{
    const {id} = req.body;
    try{
        const student = await Students.findById(id).select('-studentPassword');
        if(!student){
            return res.status(400).json({message:"student not found!"});
        }
        return res.status(200).json({student});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

const removeStudent = async(req,res) =>{
    const {studentId} = req.body;
    try{
        const student = await Students.findById(studentId);
        if(!student){
            return res.status(400).json({message:"Student not exist in the DB"});
        }
        await Students.findOneAndDelete({studentId:student.studentId});
        return res.status(200).json({message:"Student removed successfully"});
    }
    catch(err){
        return res.status(500).json({Error:err.message});
    }
}
module.exports = {registerStudent,signInStudent,getAllStudents,studentDetails,removeStudent};


