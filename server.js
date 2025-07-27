const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoute = require('./routes/student.route');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


connectDB()
.then(() => console.log("succesful"))
.catch(() => console.log("unsuccessful"));

app.use('/api/students',studentRoute);

const PORT = process.env.PORT;

app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`);
})
