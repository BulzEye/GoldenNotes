import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSignUp } from "../../hooks/useSignUp";

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
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
            </div>
        </div>
     );
}
 
export default SignUp;