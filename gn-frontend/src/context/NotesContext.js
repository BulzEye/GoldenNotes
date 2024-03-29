import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { useUserContext } from "../hooks/useUserContext";

export const NotesContext = createContext();

export const notesReducer = (state, action) => {
    switch (action.type) {
        case "NOTE_ADD":
            return {
                notes: [
                    action.payload,
                    ...state.notes
                ]
            }

        case "NOTE_MODIFY":
            console.log(action.payload);
            return {
                notes: state.notes.map((note) => {
                    return ((note._id === action.payload._id) ? action.payload : note)
                })
            }

        case "NOTE_DELETE":
            return {
                notes: state.notes.filter((note) => {
                    return note._id !== action.payload._id
                })
            }

        case "NOTES_SET":
            return {
                isLoaded: true,
                notes: action.payload
            };

        default:
            return state;
    }
}

export const NotesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notesReducer, { isLoaded: false, notes: [] });
    const { isLoggedIn, jwt, dispatch: dispatchUser } = useUserContext();

    useEffect(() => {
        const abortContr = new AbortController();
        // console.log(user);
        if(isLoggedIn) {
            fetch(`${process.env.REACT_APP_API_URL || ""}/getNotes/`, {
                signal: abortContr.signal,
                headers: { 'Authorization': `Bearer ${jwt}` }
            })
                .then(res => {
                    // console.log("Response: " + res);
                    return res.json();
                })
                .then(data => {
                    // console.log(data);
                    if(!data.error) {
                        dispatch({ type: "NOTES_SET", payload: data.notes });
                    }
                    // else, we have an error
                    // we can place 'else if' statements to handle other errors (to prevent redirects)
                    else if(data.error === "JWT has expired. Please log in again") {
                        // if JWT has expired, log out the user
                        dispatchUser({type: "USER_LOGOUT"});
                    }
                })
                .catch(err => { console.log("ERROR in fetching: " + err); });
        }

        return () => { abortContr.abort() };
        // eslint-disable-next-line
    }, [jwt]);

    return (
        <NotesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </NotesContext.Provider>
    )
}