import './App.css';
import Header from './components/Header';
// import Note from './components/Note';
import EditNote from './components/EditNote';
// import ErrorDisplay from './components/ErrorDisplay';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeBody from './components/HomeBody';

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
    fetch(`${process.env.REACT_APP_API_URL || ""}/getNotes/`)
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
        <HomeBody notes={notes}/>

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
