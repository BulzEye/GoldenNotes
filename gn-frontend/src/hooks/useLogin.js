import { useHistory } from "react-router-dom";
import { useUserContext } from "./useUserContext";

export const useLogin = () => {
    const history = useHistory();
    const { dispatch } = useUserContext(); // take the dispatch function from the user context that we have created

    const loginUser = async (email, password, googleJwt=null) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL || ""}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const resp = await res.json();
            // check for errors
            if(resp.errors) {
                console.log(resp);
                return resp.errors;
            }
            else {
                console.log("user logged in");
                console.log(resp);
                dispatch({type: "USER_LOGIN", payload: resp});
                localStorage.setItem("user", JSON.stringify(resp));
                // props.setDependencies(true); // to force reload of home page
                console.log("Going to home page");
                history.push("/");
                return null;
            }
        } catch (err) {
            console.log("ERROR sending login request: " + err);
        }
    }

    return { loginUser };
}