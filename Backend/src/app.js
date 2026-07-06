const express = require('express');
const app = express();
const CookieParser = require("cookie-parser");
const cors= require('cors')

//require all routes
const authRoute= require("./routes/auth.route")
const interviewRoute= require("./routes/interview.route")

app.use(express.json());
app.use(CookieParser());
app.use(express.urlencoded({extended:true}));
app.set('trust proxy', 1);
const FRONTEND_URL = process.env.FRONTEND_URL; 
app.use(cors({
    origin: 'https://interviewhelp-1-52zj.onrender.com',
    credentials: true
}));



app.use('/api/auth',authRoute);
app.use('/api/interview',interviewRoute);

module.exports = app;
