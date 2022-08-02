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
import { useCookies } from 'react-cookie';
import Protected from './components/Protected';

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
  // const [notes, setNotes] = useState([]);
  const history = useHistory();
  const [dependencies, setDependencies] = useState(false);
  const [user, setUser] = useState({});
  const [cookie, setCookie] = useCookies();

  const protectedRoutes = ["/", "/editnote"]

  // const editMode = (isEditMode) => {
  //   setEditNote(isEditMode);
  // }

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL || ""}/getNotes/`)
  //     .then(res => {
  //       // console.log("Response: " + res);
  //       return res.json();
  //     })
  //     .then(data => {
  //       // console.log(data.redirect);
  //       if(data.redirect) {
  //         history.push(data.redirect);
  //       }
  //       else {
  //         setUser(data.user);
  //         console.log(data.notes);
  //         setNotes(data.notes);
  //         // setIsLoading(false);
  //         setDependencies(false);
  //       }
  //     })
  //     .catch(err => {console.log("ERROR in fetching: " + err);});
  // }, [dependencies]);

  useEffect(() => {
    const abortContr = new AbortController();
    fetch(`${process.env.REACT_APP_API_URL || ""}/getUser/${cookie.jwt}`, {signal: abortContr.signal})
      .then(res => res.json())
      .then(resUser => {
        // console.log(freePaths.indexOf(history.location.pathname));
        // if (resUser.redirect && freePaths.indexOf(history.location.pathname)<0) {
        //   history.push(resUser.redirect);
        // }
        // else {
          setUser(resUser.user);
        // }
      })
      .catch((err) => {
        if(err.name === "AbortError") {
          console.log("fetch aborted");
        }
        else {
          console.log("User not found");
          console.log(err);
        }
      });
    
    return () => {abortContr.abort()};
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
    (<div className="app">
      <Switch>
        <Route exact path={"/login"}>
          <Login setDependencies={setDependencies} />
        </Route>
        <Route exact path={"/signup"}>
          <SignUp />
        </Route>
        
        <Route path={"/"}>
          <Protected user={user}>
            <Header />
            {/* <ErrorDisplay /> */}

            (<><HomeBody setDependencies={setDependencies} dependencies={dependencies}/>
              <Switch>
                <Route exact path="/editnote">
                  <Protected user={user}>
                    <EditNote user={user._id} isNewNote={true} setDependencies={setDependencies}/>
                  </Protected>
                </Route>
                <Route exact path="/editnote/:id">
                  <Protected user={user}>
                    <EditNote user={user._id} isNewNote={false} setDependencies={setDependencies}/>
                  </Protected>
                </Route>
              </Switch>
            </>)
          </Protected>
        </Route>

      </Switch>
      {/* {editNote && <EditNote closeFunction={editMode}/>} */}
      {/* <button onClick={testFetch}>Test</button> */}
    </div>)

  );
}

export default App;
