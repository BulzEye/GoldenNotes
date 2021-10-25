import { useState } from "react";
import { useHistory } from "react-router-dom";

const EditNote = (props) => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const history = useHistory();

    let handleSubmit = (event) => {
        event.preventDefault();
        if(!(title === "" && body === "")) {
            const newNote = { title, body };
            fetch("/addnote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNote)
            })
            .then(() => {
                console.log("Added new note");
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
    
    return ( 
        <div className="editNote">
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="modalHead">
                        <input type="text" name="title" id="editTitle" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <button onClick={() => {history.push("/");}}>Close</button>
                        {/* onClick={() => {props.closeFunction(false)}} */}
                    </div>
                    <div className="modalBody">
                        <textarea name="body" id="editBody" style={{}} value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default EditNote;