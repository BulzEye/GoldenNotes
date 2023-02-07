import "./Login.css";
import "./AuthStyle.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({email: null, password: null});
    const history = useHistory();
    const { dispatch } = useUserContext();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({email: null, password: null});
        setIsProcessing(true);
        fetch(`${process.env.REACT_APP_API_URL || ""}/login`, {
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
                setErrors(resp.errors);
                setIsProcessing(false);
            }
            else {
                console.log("user logged in");
                console.log(resp);
                dispatch({type: "USER_LOGIN", payload: resp});
                localStorage.setItem("user", JSON.stringify(resp));
                props.setDependencies(true); // to force reload of home page
                console.log("Going to home page");
                history.push("/"); 
            }

            // user logged in, no errors
        })
        .catch((err) => {
            console.log("ERROR sending login request: " + err);
        });
    }
    
    return (
        <div className="authContainer loginContainer">
            <div className="authPage login">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
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