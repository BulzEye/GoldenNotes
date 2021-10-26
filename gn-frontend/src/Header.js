import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <header>
            <h1>GoldenNotes</h1>
            <Link to="/editnote"><button>New Note</button></Link>
            {/* onClick={() => {props.buttonFunction(true)}} */}
        </header>
    );
}
 
export default Header;