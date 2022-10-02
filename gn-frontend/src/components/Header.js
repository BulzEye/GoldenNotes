import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

import { useUserContext } from "../hooks/useUserContext";
import "./Header.css";

const Header = () => {
    const { isLoggedIn, user } = useUserContext();
    const [ menuOpen, setMenuOpen ] = useState(false);
    const { logout } = useLogout();

    const closeMenu = () => {
        setMenuOpen(false);
    }

    document.addEventListener("click", closeMenu);

    const toggleButton = (e) => {
        e.stopPropagation();
        setMenuOpen(!menuOpen);
    }

    return ( 
        <header>
            <h1>
                <Link to={"/"}>
                    GoldenNotes
                </Link>
            </h1>
            {/* <Link to="/editnote"><button className="newNote">New Note</button></Link> */}
            {/* onClick={() => {props.buttonFunction(true)}} */}
            { isLoggedIn ? 
                <div className="usernameSection">
                    <button className="userName" onClick={toggleButton}>{user.username} <i className="bi bi-caret-down-fill"></i></button>
                    <div className="userMenu" style={menuOpen ? {display:"block"} : {display:"none"}}>
                        <ul>
                            <li><Link to={"/profile"}>Profile</Link></li>
                            <li id="logout" onClick={logout}>Logout</li>
                        </ul>
                    </div>
                </div>
                // <span className="userName">{user.username}</span>
            :
                // <Link to="/login"><button className="newNote">Login</button></Link>
                <span className="userName">Not logged in</span>
            }
        </header>
    );
}
 
export default Header;