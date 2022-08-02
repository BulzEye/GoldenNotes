import { useHistory } from "react-router-dom";

const Protected = (props) => {
    console.log(props);
    const history = useHistory();
    console.log("Reached");
    if(props.user !== undefined) {
        return props.children;    
    }
    else {
        history.push("/login");
        return (<></>)
    }
}
 
export default Protected;