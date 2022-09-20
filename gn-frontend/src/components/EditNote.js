import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./EditNote.css";

const EditNote = (props) => {
    
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const textBody = useRef(null);

    // console.log("ID: ");
    // console.log(id);
    useEffect(() => {
        if(id) {
            fetch(`${process.env.REACT_APP_API_URL || ""}/note/${id}`)
                .then((res) => res.json())
                .then((note) => {
                    setTitle(note.title);
                    setBody(note.body);
                    setIsLoading(false);
                    textBody.current.style.height = `${textBody.current.scrollHeight}px`;
                })
                .catch((err) => {
                    console.log("ERROR in fetching note: " + err);
                });
        }
        else {
            setIsLoading(false);
        }
    }, [id]);
    

    // console.log(`id: ${id}`);


    const resize = (event) => {
        // setTextHeight("inherit");
        event.target.style.height = "inherit";
        event.target.style.height = `${event.target.scrollHeight}px`;
        // setTextHeight(`${event.target.scrollHeight}px`);
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        if(id) {
            const updatedNote = { id, note: { title, body }};
            fetch(`${process.env.REACT_APP_API_URL || ""}/modifynote`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedNote)
            })
            .then(() => {
                console.log("Updated note");
                props.setDependencies(true); // to force reload of home page
                history.push("/"); 
            })
            .catch((err) => {
                console.log("ERROR updating note: " + err);
            });
        }
        else if(!(title === "" && body === "")) {
            const newNote = { title, body };
            fetch(`${process.env.REACT_APP_API_URL || ""}/addnote`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNote)
            })
            .then(() => {
                console.log("Added new note");
                props.setDependencies(true); // to force reload of home page
                history.push("/");
            })
            .catch((err) => {
                console.log("ERROR adding note: " + err);
            });
        }
        else {
            history.push("/");
        }
        
    }
    
    let deleteNote = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if(!id) {
            history.push("/");
        }
        else if(window.confirm("Do you want to delete this note?")) {
            console.log("true");
            fetch(`${process.env.REACT_APP_API_URL || ""}/deletenote/${id}`, {
                method: "DELETE",
            })
            .then(() => {
                console.log("Deleted note");
                props.setDependencies(true); // to force reload of home page
                history.push("/");
            })
            .catch((err) => {
                console.log("ERROR deleting note: " + err);
            });
        }
    }
    
    return ( 
        <div className="editNote" onClick={() => {history.push("/");}}>
            {!isLoading ?
                <div className="modal" onClick={(e) => {e.stopPropagation();}}>
                    <form onSubmit={handleSubmit}>
                        <div className="modalHead">
                            <input type="text" name="title" id="editTitle" value={title} placeholder="Enter title" onChange={(e) => setTitle(e.target.value)}/>
                            <div className="closeNote" onClick={(e) => {e.preventDefault(); history.push("/");}}><i className="bi-x"></i></div>
                            {/* onClick={() => {props.closeFunction(false)}} */}
                        </div>
                        <div className="modalBody">
                            <textarea 
                                name="body" 
                                id="editBody" 
                                rows={3} 
                                placeholder="Write a note..."
                                // style={{height: textHeight}} 
                                value={body}
                                ref={textBody}
                                onChange={(e) => {setBody(e.target.value); resize(e)}}
                                onLoad={(e) => {resize(e)}}
                            ></textarea>
                        </div>
                        <div className="modalBottom">
                            <button onClick={deleteNote} className="delete" title={"Delete note"}><i className="bi bi-trash3"></i></button>
                            <button type="submit" className="submit" title="Submit note"><i className="bi bi-arrow-right-circle"></i></button>
                        </div>
                    </form>
                </div> : ""
            }
            
        </div>
     );
}
 
export default EditNote;