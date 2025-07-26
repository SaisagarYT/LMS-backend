const Students = require('../models/student.model');
const bcrypt = require('bcrypt');

const registerStudent = async(req,res) =>{
    const {studentId,studentName,studentEmail,studentPassword,studentBirthDate,studentNumber} = req.body;
    try{
        const student = await Students.findOne({email});

        const salt = bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(studentPassword,salt);

        if(student){
            return res.status(400).json({message:"Student Already exists"});
        }
        const newStudent = new Students({
            studentId:studentId,
            studentName:studentName,
            studentEmail:studentEmail,
            studentPassword:hashedPassword,
            studentBirthDate:studentBirthDate.toLocalString(),
            studentNumber:studentNumber
        })
        await newStudent.save();
        return res.status(200).json({message:"Student registered successfully"});
    }
    catch(err){
        return res.status(500).json({error:"Internal server error at register student"});
    }
}

// const signInStudent = async(req,res) =>{
//     const {email,password} = req.body;
//     try{
//         const student = await Students.findOne({emai});
//         if(!student){
//             return res.status(400).json({message:"User not exist in the DB"});
//         }
        
//     }
// }

const getAllStudents = async(req,res) =>{
    try{
        const student = await Students.find();
        if(!student){
            return res.status(400).json({message:"No students are found"})
        }
        return res.status(200).json(student);
    }
    catch(err){
        return res.status(500).json({error:"Internal server error in getuser"})
    }
}
module.exports = {registerStudent,getAllStudents};

