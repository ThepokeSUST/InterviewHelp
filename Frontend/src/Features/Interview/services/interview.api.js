import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/interview";

const interviewApi = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Include credentials for cross-origin requests
});



/**
 *@description generate interview report
 *@route POST /api/interview/
 *@access private
 */

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);
    const response = await interviewApi.post("/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })

    return response.data;
}

/**
 * @description get interview report by reportId
 * @route GET /api/interview/report/:reportId   
 * @access private
 */
export const getInterviewReportById=async ({interviewId}) => {
    const response = await interviewApi.get(`/report/${interviewId}`);
    return response.data;
}

/**
 * @description get all interview reports of logged in user
 * @route GET /api/interview 
 * @access private
 */
export const getAllInterviewReportsOfLoggedUser=async () => {
    const response = await interviewApi.get("/");
    return response.data;
}


/**
 * @description generate resume pdf
 * @route POST /api/interview/resume-pdf/:interviewId
 * @access private  
 */

export const generateResumePdf=async({interviewId})=>{
    const response= await interviewApi.post(`/resume-pdf/${interviewId}`,null,{
        responseType:'blob'
    });
    return response.data;
}