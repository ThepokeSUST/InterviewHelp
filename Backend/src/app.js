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

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.use('/api/auth',authRoute);
app.use('/api/interview',interviewRoute);

module.exports = app;
