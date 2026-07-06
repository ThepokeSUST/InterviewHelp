import axios from "axios";

const api= axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials:true
})


export async function register({username,email,password}){
   

     try{
         const response=await api.post('/api/auth/register',{
            username,
            email,
            password
         })
         console.log("from register api")
         return response.data;
     }
     catch(err){
        // console.log("_P_")
        console.log(err);
        throw err;
     }


}


export async function login({email,password}){
      
        
     try{

        // console.log("this is login api")
        const response=await api.post("/api/auth/login",{
            email,
            password
        });
        // console.log("this is login api2")

        // console.log(response)
    //   console.log("_______",response.data);
      return response.data;

     }
     catch(err){
        console.log(err);
        throw err
     }
}




export async function logout(){
    try{
        const response= await api.get("/api/auth/logout");

        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export async function getMe(){
    
    try{
        // console.log("this is getMe api")
      const response= await api.get("/api/auth/me");
        // console.log("this is getMe api2")
      
      return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}