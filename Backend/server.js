require('dotenv').config();
const app=require('./src/app.js');
const PORT = process.env.PORT || 3000;

const { connectDB } = require('./src/config/database.js');

//ai service testing
// const {resume,selfDescription,jobDescription}=require('./src/services/temp.js');
// const { generateInterviewReport } = require('./src/services/ai.service.js');

connectDB();

// generateInterviewReport({resume,selfDescription,jobDescription}).then((res)=>{
//     console.log("this... is res from ai service",res);
// }).catch((err)=>{
//     console.log("this... is err from ai service",err);
// });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
} );