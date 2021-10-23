const EditNote = () => {
    return ( 
        <div className="editNote">
            <div className="modal">
                <form action="./editnote" method="post">
                    <div className="modalHead">
                        <input type="text" name="title" id="editTitle" />
                        <button type="submit">Close</button>
                    </div>
                    <div className="modalBody">
                        <textarea name="body" id="editBody" style={{}}></textarea>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default EditNote;