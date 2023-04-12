import "./Login.css";
import "./AuthStyle.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { GoogleLogin } from "@react-oauth/google";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({email: null, password: null});
    const { loginUser } = useLogin();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({email: null, password: null});
        setIsProcessing(true);
        
        const res = await loginUser(email, password);
        console.log(res);

        if(res) {
            setErrors(res.errors);
            setIsProcessing(false);
        }
    }
    
    return (
        <div className="authContainer loginContainer">
            <div className="authPage login">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <GoogleLogin 
                        onSuccess={async tokenResponse => {
                            console.log(tokenResponse);
                            const res = await loginUser("", "", tokenResponse.credential);
                            console.log(res);

                            // a res is only returned if there are errors
                            if(res) {
                                setErrors(res);
                                setIsProcessing(false);
                            }
                        }}
                        onError={() => {
                            console.log(`ERROR in logging in using Google`);
                        }}
                        logo_alignment="center"
                    />
                    {errors.google && <div className="error errorGoogle">{errors.google}</div>}
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="loginEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <div className="error errorMail">{errors.email}</div>}
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="loginPass" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <div className="error errorPass">{errors.password}</div>}
                    <button type="submit" disabled={isProcessing}>Login</button>
                </form>
                <span className="prompt">Don't have an account? <Link to={"/signup"}>Sign up</Link> instead.</span>
            </div>
        </div>
    );
}

export default Login;