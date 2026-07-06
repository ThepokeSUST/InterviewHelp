import "../auth.form.scss"
import {Link} from "react-router"
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () =>{


    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {loading,handleLogin,user} = useAuth();

    const navigate= useNavigate()


   async function handleSubmit(e){
      e.preventDefault();
      // console.log(email, password);
      try{
          await handleLogin({email,password});
          // console.log("login successful");
          navigate('/');
      }
      catch(err){
          console.log(err);
          console.log("login failed");
          
      }
      
    }

    if(loading){
        return <>
        <div className="loading-overlay">
        <div className="loading-card">
          <div className="spinner"></div>
          <h3 style={{color:"black"}}>Logging in...</h3>
          <p style={{color:"black"}}>Please wait</p>
        </div>
      </div>
        </>
    }

    return (<>
    


     <main>
      <div className="form-container">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button
            className="button primary-button"
            type="submit"
            // onClick={handleSubmit}
          >
            Login
          </button>

        </form>

        <p>
          don't have an account? <Link to="/register">register</Link>
        </p>

      </div>
    </main>
   
    </>)
}


export default Login;