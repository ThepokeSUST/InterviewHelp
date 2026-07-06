const express= require("express");
// const app= express();
const interviewRouter= express.Router();
const {authUser}= require('../middlewares/auth.middleware')
const upload= require('../middlewares/file.middleware');
const {generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportOfLoggedUserController,generateResumePdfController} = require('../controllers/interview.controller')

/**
 * @route POST /api/interview
 * description generate new interview report on the bases of user self description,resume pdf and job description
 * @access private
 */
interviewRouter.post("/",authUser,upload.single('resume'),generateInterviewReportController)


/**
 * @route GET /api/interview/report/:interviewId
 * description get interview report by interviewId
 * @access private
 */

interviewRouter.get("/report/:interviewId",authUser,getInterviewReportByIdController)



/**
 * @route GET /api/interview
 * description get all interview reports of logged in user
 * @access private
 */
interviewRouter.get("/",authUser,getAllInterviewReportOfLoggedUserController)


interviewRouter.post('/resume-pdf/:interviewId',authUser,generateResumePdfController);

module.exports=interviewRouter;