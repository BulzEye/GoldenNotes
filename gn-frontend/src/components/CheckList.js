import { useState } from "react";
import "./CheckList.css";

const CheckList = (props) => {
    const [checked, setChecked] = useState(false);

    const deleteItem = (e) => {
        e.preventDefault();
    }

    return (
        <div className="checkList uncheckedbox">
            {/* <input type="checkbox" name="item" className="checkbox" /> */}
            <div className="checkBox" onClick={() => {setChecked(!checked)}}>
                { checked ? 
                    <i className="bi bi-check-square"></i>
                    :
                    <i className="bi bi-square"></i>
                }
            </div>
            <input type="text" name="checkValue" id="val" autoComplete="off" />
            <button className="deleteCheck" onClick={deleteItem}><i className="bi-x"></i></button>
        </div>
    );
}

export default CheckList;