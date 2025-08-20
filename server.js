const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoute = require('./routes/student.route');
const courseRoute = require('./routes/course.route');
const likedCourse = require('./routes/likedCourse.route');
const categoryRoute = require('./routes/category.route');
const moduelRoute = require('./routes/module.route');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB()
.then(() => console.log("succesful"))
.catch(() => console.log("unsuccessful"));

app.use('/api/students',studentRoute);
app.use('/api/course',courseRoute);
app.use('/api/likedCourse/',likedCourse);
app.use('/api/category',categoryRoute);
app.use('/api/module',moduelRoute);

const PORT = process.env.PORT;

app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`);
})
