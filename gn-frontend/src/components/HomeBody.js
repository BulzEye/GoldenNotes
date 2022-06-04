import Note from "./Note";
import "./HomeBody.css";
import { Link } from "react-router-dom";

const HomeBody = (props) => {
    return (
        <div className="noteBody">
            {props.notes.map((note) => (
                <Note key={note._id} content={note} />
            ))
            }
            {/* <Note /> */}
            <Link to={"/editnote"}>
                <div className="newNote">
                    <i class="bi bi-pen"></i>
                </div>
            </Link>
        </div>
    );
}

export default HomeBody;