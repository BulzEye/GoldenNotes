import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";
import "./Profile.css";

const Profile = (props) => {
    const { user } = useUserContext();
    const { logout } = useLogout();

    return ( 
        <div className="userProfileContainer">
            <div className="userProfile">
                <h1>User Profile</h1>
                <div className="profileEntry">
                    <span className="profileLabel">Username</span>
                    <div className="profileContent">
                        {user.username}
                    </div>
                </div>
                <div className="profileEntry">
                    <span className="profileLabel">Email</span>
                    <div className="profileContent">
                        {user.email}
                    </div>
                </div>
                <Link to={"/"} onClick={logout}>
                    Logout
                </Link>
            </div>
        </div>
     );
}
 
export default Profile;