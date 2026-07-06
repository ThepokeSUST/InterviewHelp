const mongoose= require("mongoose");






/**
 * jon description // string
 * resume  // string
 * self description // string
 * 
 * matchScore // number
 * 
 * Technical qs //[
 *  {
 *   question: string,
 *  intention: string,
 *  answer: string}
 * ]
 * behavioral qs //[
 *    question: string,
 *   intention: string,
 *    answer: string}
 * ]
 * skill gap //[
 *    {
 *     skill: string,
 *     severity:{
 *         type: string,
 *         enum: ['low','medium','high'],}
 *     }
 * ]
 * preparation plan //[
 *    {
 *     day: number,
 *    focus: string,
 *       tasks: [string]
 */



const technicalQuestionSchema= mongoose.Schema({
     question:{
        type:String,
        required:[true,"question is required"]
    },
    intention:{
        type:String,
        required:[true,"intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{_id:false});


const behavioralQuestionSchema= mongoose.Schema({
    question:{
        type:String,
        required:[true,"question is required"]
    },
    intention:{

        type:String,
        required:[true,"intention is required"]
    },  
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{_id:false});



const skillGapSchema= mongoose.Schema({
    skill:{
        type:String,
        require:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:['low','medium','high'],
        required:[true,"severity is required"]
    } 
},{
    _id:false
})

const preparationPlanSchema= mongoose.Schema({
    day:{
        type:Number,
        required:[true,"day is required"]
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
    },
    tasks:{
        type:[String],
        required:[true,"tasks is required"]
    }
},{_id:false});

const interviewReportSchema= mongoose.Schema({

    jobDescription:{
        type:String,
        required:[true,"job description is required"]
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: [ true, "Job title is required" ]
    }
},{
    timestamps:true
});


const interviewReportModel= mongoose.model("interviewReport",interviewReportSchema);

module.exports=interviewReportModel;