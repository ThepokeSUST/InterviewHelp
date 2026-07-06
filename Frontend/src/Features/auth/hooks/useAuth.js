
import { register, login, logout,getMe } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";




export const useAuth = () => {

      const context = useContext(AuthContext);
      const { user, setUser, loading, setLoading } = context

      const handleLogin = async ({ email, password }) => {
            console.log("this is handleLogin")
            setLoading(true);
            try {
                  const data = await login({ email, password });
                  // console.log("'''''''''''")
                  // console.log(data.user);
                  setUser(data.user);
                  // console.log(data, "   from login in useAuth")
            }
            catch (err) {
                  console.log(err.message);
                  throw err;
            }
            finally {
                  setLoading(false)
                  // alert("login failed");
            }
      }

      const handleRegister = async ({ username, email, password }) => {
            setLoading(true);

            try {
                  const data = await register({ username, email, password })
                  setUser(data.user);
            }
            catch (err) {
              throw err;
            }
            finally {
                  setLoading(false);
            }

      }

      const handleLogout=async ()=>{
        setLoading(true);
        try{
            await logout();
        setUser(null);
        }
        catch(err){

        }
        finally{
        setLoading(false);

        }
      }


            useEffect(()=>{
           
                  // console.log("......____......this is useEffect from useAuth")
         //   console.log("this is useEffect")
           const getAndSetUser= async ()=>{
            try{
               const data= await getMe()
            //    console.log("this is getMe data",data)
               setUser(data.user);
            }
            catch(err){
            //   console.log("Error in getMe function");
            console.log(err);
            // console.log("okoko");
              setUser(null);
            }
            finally{
               setLoading(false)
            }
            
           }
           getAndSetUser()
      },[])


      return {user,setUser,loading,setLoading,handleLogin,handleLogout,handleRegister}


}