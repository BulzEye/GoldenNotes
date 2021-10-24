import { Link } from "react-router-dom";

const EditNote = (props) => {
    return ( 
        <div className="editNote">
            <div className="modal">
                <form action="/editnote" method="post">
                    <div className="modalHead">
                        <input type="text" name="title" id="editTitle" />
                        <Link to="/"><button>Close</button></Link>
                        {/* onClick={() => {props.closeFunction(false)}} */}
                    </div>
                    <div className="modalBody">
                        <textarea name="body" id="editBody" style={{}}></textarea>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default EditNote;