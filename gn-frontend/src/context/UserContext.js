import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

export const userReducer = (state, action) => {
    switch(action.type) {
        case "USER_LOGIN":
            return {
                isLoggedIn: true,
                ...action.payload
            };

        case "USER_LOGOUT":
            return {
                isLoggedIn: false,
                jwt: null,
                user: null
            }
        default:
            return state;
    }
};

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, {
        isLoggedIn: false
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        if(user) {
            dispatch({type: "USER_LOGIN", payload: user});
        }
    }, [])

    return (
        <UserContext.Provider value={{ ...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
};