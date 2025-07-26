const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async() =>{
    try{
        const response = await mongoose.connect(process.env.MONGODB_API);
        console.log(response.connection.name);
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = connectDB;