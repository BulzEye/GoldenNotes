import Note from "./Note";
import "./HomeBody.css";
import { Link } from "react-router-dom";
import { useNotesContext } from "../hooks/useNotesContext";

const HomeBody = (props) => {   
    // const [notes, setNotes] = useState([]);
    // const history = useHistory();
    // const [isLoading, setIsLoading] = useState(true);
    // const { dependencies, setDependencies } = props;
    // const { jwt } = useUserContext();
    const { notes: notes2 } = useNotesContext();

    // useEffect(() => {
    //     const abortContr = new AbortController();
    //     // console.log(user);
    //     fetch(`${process.env.REACT_APP_API_URL || ""}/getNotes/`, {
    //         signal: abortContr.signal,
    //         headers: {'Authorization': `Bearer ${jwt}`}
    //     })
    //         .then(res => {
    //             // console.log("Response: " + res);
    //             return res.json();
    //         })
    //         .then(data => {
    //             // console.log(data.redirect);
    //             // if (data.redirect) {
    //             //     history.push(data.redirect);
    //             // }
    //             // else {
    //                 // console.log(data.notes);
    //                 setNotes(data.notes);
    //                 // dispatch({type: "NOTES_SET", payload: data.notes});
    //                 setIsLoading(false);
    //                 setDependencies(false);
    //             // }
    //         })
    //         .catch(err => { console.log("ERROR in fetching: " + err); });

    //     return () => {abortContr.abort()};
    //         // eslint-disable-next-line
    // }, [dependencies, history]);

    return (
        // (!isLoading) ? 
        <div className="noteBody">
            {notes2 && notes2.map((note) => (
                <Note key={note._id} content={note} />
            ))
            }
            {/* {JSON.stringify(notes2)} */}
            {/* <Note /> */}
            {/* <span>{JSON.stringify(user)}</span> */}
            {/* New note button (on bottom right) */}
            <Link to={"/editnote"}>
                <div className="newNote">
                    <i className="bi bi-pen"></i>
                </div>
            </Link>
        </div>
        //  : null
    );
}

export default HomeBody;