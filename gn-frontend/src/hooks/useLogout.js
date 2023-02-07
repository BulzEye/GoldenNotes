import { useUserContext } from "./useUserContext"

export const useLogout = () => {
    const { dispatch } = useUserContext();

    const logout = () => {
        console.log("Logout request received");
        localStorage.removeItem("user");
        dispatch({type: "USER_LOGOUT"});
    }

    return { logout };
}