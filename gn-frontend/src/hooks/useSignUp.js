import { useHistory } from "react-router-dom"
import { useUserContext } from "./useUserContext";

export const useSignUp = () => {
    const history = useHistory();
    const { dispatch } = useUserContext();

    const signUp = async (email, password, googleJwt=null) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL || ""}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, googleJwt })
            });
            const resp = await res.json();

            if(resp.errors) {
                console.log(resp);
                return resp.errors;
            }
            else {
                // user logged in, no errors
                // props.setDependencies(true); // to force reload of home page
                console.log("user signed up");
                console.log(resp);
                dispatch({type: "USER_LOGIN", payload: resp});
                localStorage.setItem("user", JSON.stringify(resp));
                history.push("/");
                return null;
            }

        }
        catch(err) {
            console.log("ERROR sending signup request: " + err);
        }
    }

    return { signUp };
}