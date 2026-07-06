
const pdfParse= require('pdf-parse')
const {generateInterviewReport,generateResumePdf}=require('../services/ai.service');
const interviewReportModel= require("../models/interviewReport.model")



/**
 * description generate new interview report on the bases of user self description,resume pdf and job description
 * @access private
 */

async function generateInterviewReportController(req,res){
   

    const resumeFile= req.file;
    const resumeContent=await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDescription}= req.body;

    // console.log("sklks---")

    const interviewReportByAi=await  generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })

    // console.log("sklks")

    const interviewReport= await interviewReportModel.create({
        user:req.user._id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message:"interview report generated successfully",
        interviewReport
    })
}



/**
 * description get interview report by interviewId
 * @access private
 */

async function getInterviewReportByIdController(req,res){
    
      const {interviewId}= req.params;
    //   console.log(interviewId," ___-___ interviewId")
      const interviewReport= await interviewReportModel.findOne({_id:interviewId,user:req.user._id});
        // console.log(interviewReport);
    //   console.log(interviewReport,"___-___ interviewReport")
      if(!interviewReport){
        return res.status(404).json({
            message:"interview report not found"
        })
      }

      res.status(200).json({
          message:"interview report found",
          interviewReport
      })

}


/**
 * description get all interview reports of logged in user
 * @access private
 */

async function getAllInterviewReportOfLoggedUserController(req,res){
          
    const interviewReports= await interviewReportModel.find({user:req.user._id}).sort({createdAt:-1}).select('-resume -selfDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan');
    
    return res.status(200).json({
        message:"interview report fetched successfully",
        interviewReports
    })

}


async function generateResumePdfController(req,res){
    const {interviewId}= req.params;
    const interviewReport= await interviewReportModel.findOne({_id:interviewId,user:req.user._id});

    if(!interviewReport){
        return res.status(404).json({
            message:"interview report not found"
        })
    }

    const {resume,selfDescription,jobDescription}=interviewReport;

    const pdfBuffer= await generateResumePdf({resume,selfDescription,jobDescription});

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=interview_report_${interviewId}.pdf`);
    
    res.status(200).send(pdfBuffer);
}

module.exports={generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportOfLoggedUserController,generateResumePdfController}