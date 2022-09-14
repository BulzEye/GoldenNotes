import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "../../hooks/useSignUp";

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useSignUp();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(email, password);
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
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="signupPass" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Register</button>
                </form>
                <span className="prompt">Already have an account? <Link to={"/login"}>Login</Link> instead.</span>
            </div>
        </div>
     );
}
 
export default SignUp;