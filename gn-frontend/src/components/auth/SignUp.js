import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "../../hooks/useSignUp";
import "./AuthStyle.css";

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({email: null, password: null});
    const { signUp } = useSignUp();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({email: null, password: null});
        setIsProcessing(true);
        const res = await signUp(email, password);
        console.log(res);

        // a res is only returned if there are errors
        if(res) {
            setErrors(res);
            setIsProcessing(false);
        }
    }
    
    return ( 
        <div className="authContainer signupContainer">
            <div className="authPage signup">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="signupEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <div className="error errorMail">{errors.email}</div>}
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="signupPass" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <div className="error errorPass">{errors.password}</div>}
                    <button type="submit" disabled={isProcessing}>Register</button>
                </form>
                <span className="prompt">Already have an account? <Link to={"/login"}>Login</Link> instead.</span>
            </div>
        </div>
     );
}
 
export default SignUp;