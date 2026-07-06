import '../styles/loading.scss'
import { useAuth } from "../hooks/useAuth";
// import { useNavigate } from "react-router";
import { Navigate } from "react-router";

const Protected= ({children})=>{
    const {loading,user}=useAuth()
    // const navigate= useNavigate() 
    if(loading){
       return <><div className="loading-overlay">
        <div className="loading-card">
          <div className="spinner"></div>
          <h3 style={{color:"black"}}>Logging in...</h3>
          <p style={{color:"black"}}>Please wait</p>
        </div>
      </div></> 
    }
    // console.log("this is user in protected",user)
    if(!user){
        // navigate('/login');
        // return null;

        return <Navigate to={'/login'}/>
    }
    return <>
    {children}
    </>
} 

export default Protected;
