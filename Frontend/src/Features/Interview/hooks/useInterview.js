import {generateInterviewReport,getAllInterviewReportsOfLoggedUser,getInterviewReportById,generateResumePdf} from "../services/interview.api.js"

import { useContext,useEffect } from "react"
import { interviewContext } from "../interview.context.jsx"
import { useParams } from "react-router"
import { AuthContext } from "../../auth/auth.context.jsx"
export const useInterview=()=>{

    const context = useContext(interviewContext);
    const userContext = useContext(AuthContext);
    const { interviewId } = useParams()
    const {user}=userContext;
    const {loading,setLoading,report,setReport,reports,setReports}=context;
    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider");
    }
    const generateReport=async({jobDescription,selfDescription,resumeFile})=>{
        try{
            setLoading(true);
            // console.log("helleo")
            const data=await generateInterviewReport({jobDescription,selfDescription,resumeFile});
            setReport(data.interviewReport);
            setLoading(false);
            return data;
        }catch(error){
            setLoading(false);
            throw error;
        }

     }
     const getReportById=async({interviewId})=>{
        try{
            setLoading(true);
            const data=await getInterviewReportById({interviewId});
            setReport(data.interviewReport);
            setLoading(false);
            return data;
        }catch(error){
            setLoading(false);
            throw error;
        }
    }
    const getAllReports=async()=>{
        try{
            setLoading(true);
            const data=await getAllInterviewReportsOfLoggedUser();
            setReports(data.interviewReports);
            setLoading(false);
            return data;
        }catch(error){
            setLoading(false);
            throw error;
        }
    }


  const getResumePdf = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById({interviewId})
        } else {
            getAllReports()
        }



    }, [ interviewId ])
    return {loading,report,reports,generateReport,getReportById,getAllReports,setReport,setReports,user,getResumePdf};
}
