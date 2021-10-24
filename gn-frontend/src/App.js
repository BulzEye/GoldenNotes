import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Note from './Note';
import EditNote from './EditNote';
import ErrorDisplay from './ErrorDisplay';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const notesTest = [
    {
      title: "First Note",
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque earum eveniet harum quas, recusandae illum dolorum natus fugit ipsa illo, quasi tenetur, amet soluta voluptatum?'
    },
    {
      title: "Second Note",
      body: "boo"
    }
  ];
  const [editNote, setEditNote] = useState(false);
  const [notes, setNotes] = useState(notesTest);

  const editMode = (isEditMode) => {
    setEditNote(isEditMode);
  }

  useEffect(() => {
    fetch("/getNotes/")
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {console.log("ERROR: " + err);});
  }, [])

  return (
    // Header section
    <Router>
      <div className="app">
        <Header buttonFunction={editMode} />
        {/* <ErrorDisplay /> */}
        <div className="noteBody">
          { notes.map((note) => (
            <Note content={note} />
            )) 
          }
          {/* <Note /> */}

        </div>

        <Switch>
          <Route path="/editnote">
            <EditNote closeFunction={editMode}/>
          </Route>
        </Switch>
        {editNote && <EditNote closeFunction={editMode}/>}
      </div>
    </Router>

  );
}

export default App;
