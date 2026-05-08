import React from "react";

const LoginForm = ({
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    loading,
    error
}) => {
    return(
        
        <div>
            <h1>Login Form</h1>
            <form onSubmit={handleLogin}>
                <input type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                 />

                 <input type="password"
                 placeholder="Enter Password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 />
                 <button type="submit" >
                    {loading? "Logging in...":"Login"}
                 </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    
    )
}

export default LoginForm;