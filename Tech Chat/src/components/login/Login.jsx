import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
    const [err,setErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        
        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/") 
        }

        catch(err){
            setErr(true)
            
        }    
    }
    return (
        <div className="panel">
            <div className="form-container">
                <div className="heading">
                    {err && <span>Username or Password incorrect!</span>}
                    <h1>Login</h1>
                </div>

                <div className="mid">
                    <form className="form" onSubmit={handleSubmit}>
                        <input className="input" type="text" placeholder="Email" />
                        <input className="input" type="password" placeholder="Password" />
                        <button className="submitBtn btn btn-primary" type="submit">Submit</button>
                        <br />
                        <h6 style={{color:"black"}}>New user <span> <Link to = "/register">Register</Link></span></h6>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;