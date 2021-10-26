import { Link } from "react-router-dom";

const Note = (props) => {
    return ( 
        
        <div className="note">
            <Link to={`/editnote/${props.content._id}`}>
                <h3> {/* Note heading */} {props.content.title} </h3>
                <p> { /* Note body */ } {props.content.body} </p>
            </Link>
        </div>
     );
}
 
export default Note;