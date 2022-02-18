import { Link, useHistory } from "react-router-dom";
import "./Note.css";

const Note = (props) => {
    const history = useHistory();
    const loadNote = () => {
        console.log("Note loaded");
        history.push(`/editnote/${props.content._id}`);
        // history.push("/");
    }

    return ( 
        
        <div className="note" onClick={loadNote}>
            {/* <Link to={`/editnote/${props.content._id}`}> */}
            <h3> {/* Note heading */} {props.content.title} </h3>
            <p> { /* Note body */ } {props.content.body} </p>
            {/* </Link> */}
        </div>
     );
}
 
export default Note;