import { useState } from "react";
import "./CheckList.css";

const CheckList = (props) => {
    console.log(props);
    const [checked, setChecked] = useState(props.checked);
    const [content, setContent] = useState(props.content);

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
            <input type="text" name="checkValue" id="val" autoComplete="off" value={content} onInput={(e) => setContent(e.target.value)} />
            <button className="deleteCheck" onClick={deleteItem}><i className="bi-x"></i></button>
        </div>
    );
}

export default CheckList;