import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Register() {




    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const { handleRegister, loading } = useAuth();

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleRegister({ username, email, password });
            navigate('/login');

        }
        catch (err) {
            console.log(err);
            console.log("register failed");
        }
    }



    return (<>
        {loading && (
            <div className="loading-overlay">
                <div className="loading-card">
                    <div className="spinner"></div>
                    <h3 style={{ color: "black" }}>Logging in...</h3>
                    <p style={{ color: "black" }}>Please wait</p>
                </div>
            </div>
        )}

        <main>
            <div className="form-container">

                <h1>Register</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">User name:</label>
                        <input type="text" id="username" name="username" placeholder="user name" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button className="button primary-button">Register</button>

                </form>
                <p>already have an account?<Link to="/login" >Login</Link></p>

            </div>
        </main>
    </>)
}


export default Register;