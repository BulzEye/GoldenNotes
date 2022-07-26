import './App.css';
import Header from './components/Header';
// import Note from './components/Note';
import EditNote from './components/EditNote';
// import ErrorDisplay from './components/ErrorDisplay';
import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import HomeBody from './components/HomeBody';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

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
  const history = useHistory();
  const [dependencies, setDependencies] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

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
        // console.log(data.redirect);
        if(data.redirect) {
          history.push(data.redirect);
        }
        setUser(data.user);
        setNotes(data.notes);
        setIsLoading(false);
        setDependencies(false);
      })
      .catch(err => {console.log("ERROR in fetching: " + err);});
  }, [dependencies, history]);

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
    (<div className="app">
      <Switch>
        <Route exact path={"/login"}>
          <Login setDependencies={setDependencies} />
        </Route>
        <Route exact path={"/signup"}>
          <SignUp />
        </Route>
        
        <Route path={"/*"}>
          <Header />
          {/* <ErrorDisplay /> */}

          {!isLoading ? (<><HomeBody notes={notes}/>
            <Switch>
              <Route exact path="/editnote">
                <EditNote user={user._id} isNewNote={true} setDependencies={setDependencies}/>
              </Route>
              <Route exact path="/editnote/:id">
                <EditNote user={user._id} isNewNote={false} setDependencies={setDependencies}/>
              </Route>
            </Switch>
          </>) : null }
        </Route>

      </Switch>
      {/* {editNote && <EditNote closeFunction={editMode}/>} */}
      {/* <button onClick={testFetch}>Test</button> */}
    </div>)

  );
}

export default App;
