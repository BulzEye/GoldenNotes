import { useHistory } from "react-router-dom";
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
            <h3>{props.content.title}</h3> {/* Note heading */}
            <p>{props.content.body}</p> { /* Note body */ }
            {/* Note that every space in between the <p> tags will be displayed as-is (due to the whitespace property added). */}
            {/* Thus do not add additional whitespace between those tags */}
            {/* </Link> */}
        </div>
     );
}
 
export default Note;