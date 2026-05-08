import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () =>{
    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [loading , setLoading] = useState("");
    const [error , setError] = useState("");

    const handleLogin = async (e)=>{
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await mockLogin(email , password);
            console.log(response.token);
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        }
        finally{
            setLoading(false);
        }
    }


    return(
        <LoginForm 
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
        loading={loading}
        error={error}
        />
    )
}

export default Login;