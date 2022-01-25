import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Note from './Note';
import EditNote from './EditNote';
import ErrorDisplay from './ErrorDisplay';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  // const notesTest = [
  //   {
  //     title: "First Note",
  //     body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque earum eveniet harum quas, recusandae illum dolorum natus fugit ipsa illo, quasi tenetur, amet soluta voluptatum?'
  //   },
  //   {
  //     title: "Second Note",
  //     body: "boo"
  //   }
  // ];
  // const [editNote, setEditNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [dependencies, setDependencies] = useState(false);

  // const editMode = (isEditMode) => {
  //   setEditNote(isEditMode);
  // }

  useEffect(() => {
    fetch("/getNotes/")
      .then(res => {
        // console.log("Response: " + res);
        return res.json();
      })
      .then(data => {
        // console.log(data);
        setNotes(data);
        setDependencies(false);
      })
      .catch(err => {console.log("ERROR in fetching: " + err);});
  }, [dependencies]);

  // let testFetch = () => {
  //   fetch("http://localhost:3001/getNotes/")
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch(err => {console.log("ERROR: " + err);});
  // };

  return (
    // Header section
    <Router>
      <div className="app">
        <Header />
        {/* <ErrorDisplay /> */}
        <div className="noteBody">
          { notes.map((note) => (
            <Note key={note._id} content={note} />
            )) 
          }
          {/* <Note /> */}

        </div>

        <Switch>
          <Route exact path="/editnote">
            <EditNote isNewNote={true} setDependencies={setDependencies}/>
          </Route>
          <Route exact path="/editnote/:id">
            <EditNote isNewNote={false} setDependencies={setDependencies}/>
          </Route>
        </Switch>
        {/* {editNote && <EditNote closeFunction={editMode}/>} */}
      </div>
      {/* <button onClick={testFetch}>Test</button> */}
    </Router>

  );
}

export default App;
