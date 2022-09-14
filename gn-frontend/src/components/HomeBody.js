import Note from "./Note";
import "./HomeBody.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";

const HomeBody = (props) => {   
    const [notes, setNotes] = useState([]);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const { dependencies, setDependencies } = props;
    const { user, jwt } = useUserContext();


    useEffect(() => {
        const abortContr = new AbortController();
        // console.log(user);
        fetch(`${process.env.REACT_APP_API_URL || ""}/getNotes/`, {
            signal: abortContr.signal,
            headers: {'Authorization': `Bearer ${jwt}`}
        })
            .then(res => {
                // console.log("Response: " + res);
                return res.json();
            })
            .then(data => {
                // console.log(data.redirect);
                // if (data.redirect) {
                //     history.push(data.redirect);
                // }
                // else {
                    console.log("We are still fetching data");
                    setNotes(data.notes);
                    setIsLoading(false);
                    setDependencies(false);
                // }
            })
            .catch(err => { console.log("ERROR in fetching: " + err); });

        return () => {abortContr.abort()};
            // eslint-disable-next-line
    }, [dependencies, history]);

    return (
        (!isLoading) ? <div className="noteBody">
            {notes && notes.map((note) => (
                <Note key={note._id} content={note} />
            ))
            }
            {/* <Note /> */}
            {/* <span>{JSON.stringify(user)}</span> */}
            <Link to={"/editnote"}>
                <div className="newNote">
                    <i className="bi bi-pen"></i>
                </div>
            </Link>
        </div> : null
    );
}

export default HomeBody;