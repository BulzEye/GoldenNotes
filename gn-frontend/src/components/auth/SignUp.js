import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL || ""}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then((res) => {
            return res.json();
        })
        .then((resp) => {
            // check for errors
            if(resp.errors) {
                console.log(resp);
            }
            else {
                // user logged in, no errors
                // props.setDependencies(true); // to force reload of home page
                history.push("/"); 
            }

        })
        .catch((err) => {
            console.log("ERROR sending signup request: " + err);
        });
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