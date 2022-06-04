import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./EditNote.css";

const EditNote = (props) => {

    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    // console.log("ID: ");
    // console.log(id);
    useEffect(() => {
        if(id) {
            fetch(`/note/${id}`)
                .then((res) => res.json())
                .then((note) => {
                    setTitle(note.title);
                    setBody(note.body);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log("ERROR in fetching note: " + err);
                });
        }
        else {
            setIsLoading(false);
        }
    }, []);
    

    // console.log(`id: ${id}`);

    let handleSubmit = (event) => {
        event.preventDefault();
        if(id) {
            const updatedNote = { id, note: { title, body }};
            fetch("/modifynote", {
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
            fetch("/addnote", {
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
            fetch(`/deletenote/${id}`, {
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
                            <button onClick={(e) => {e.preventDefault(); history.push("/");}}><i className="bi-x"></i></button>
                            {/* onClick={() => {props.closeFunction(false)}} */}
                        </div>
                        <div className="modalBody">
                            <textarea name="body" id="editBody" placeholder="Write a note..." style={{}} value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        </div>
                        <div className="modalBottom">
                            <button type="submit" className="submit">Submit</button>
                            <button onClick={deleteNote} className="delete"><i className="bi bi-trash3"></i></button>
                        </div>
                    </form>
                </div> : ""
            }
            
        </div>
     );
}
 
export default EditNote;