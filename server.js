const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const studentRoute = require('./routes/student.route');
const courseRoute = require('./routes/course.route');
const likedCourse = require('./routes/likedCourse.route');
const categoryRoute = require('./routes/category.route');
const moduelRoute = require('./routes/module.route');
const videoRoute = require('./routes/video.route');
const chatbotRoute = require('./routes/chatbot.route');
const enrollmentRoute = require('./routes/enrollment.route');
const reviewsRoute = require('./routes/reviews.routes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'http://localhost:8080','http://localhost:5050','http://localhost:8081', 'https://bootcamp4all.netlify.app'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB()
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log("Database connection failed:", err));

app.use('/api/students',studentRoute);
app.use('/api/course',courseRoute);
app.use('/api/likedCourse',likedCourse);
app.use('/api/category',categoryRoute);
app.use('/api/module',moduelRoute);
app.use('/api/videos',videoRoute);
app.use('/api/chatbot',chatbotRoute);
app.use('/api/enrollment',enrollmentRoute);
app.use('/api/reviews',reviewsRoute);

const PORT = process.env.PORT || 5050;

app.listen(PORT,() =>{
    console.log(`Server running on http://localhost:${PORT}`);
});
