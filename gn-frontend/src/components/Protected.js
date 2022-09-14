import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const Protected = (props) => {
    const {userState, dispatch} = useUserContext();
    const [cookies] = useCookies();
    const history = useHistory();

    useEffect(() => {
        console.log(document.cookie);
    })

    // console.log(props);
    console.log("Reached");
    // TODO: add jwt verification as well to the logged in check
    if(userState.isLoggedIn) {
        return props.children;
    }
    else {
        history.push("/login");
        return (<></>)
    }
}
 
export default Protected;