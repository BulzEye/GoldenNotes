const Note = (props) => {
    return ( 
        <div className="note">
            <h3> {/* Note heading */} {props.content.title} </h3>
            <p> { /* Note body */ } {props.content.body} </p>
        </div>
     );
}
 
export default Note;