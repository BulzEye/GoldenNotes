import './App.css';
import Header from './components/Header';
// import Note from './components/Note';
import EditNote from './components/EditNote';
// import ErrorDisplay from './components/ErrorDisplay';
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomeBody from './components/HomeBody';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import { useUserContext } from './hooks/useUserContext';

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
    // const history = useHistory();
    const [dependencies, setDependencies] = useState(false);
    const { isLoggedIn } = useUserContext();

    // const editMode = (isEditMode) => {
    //   setEditNote(isEditMode);
    // }

    // useEffect(() => {
    //   console.log("Reached home page");
    //   console.log(isLoggedIn);
    //   console.log(user);
    // }, [])

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
                    {!isLoggedIn ? <Login setDependencies={setDependencies} /> : <Redirect to={"/"} />}
                </Route>
                <Route exact path={"/signup"}>
                    {!isLoggedIn ? <SignUp /> : <Redirect to={"/"} />}
                </Route>
                <Route path={"/"}>
                    {isLoggedIn ? (<>
                        <Header />
                        {/* <ErrorDisplay /> */}
                        <HomeBody setDependencies={setDependencies} dependencies={dependencies} />
                        <Switch>
                            <Route exact path="/editnote">
                                <EditNote isNewNote={true} setDependencies={setDependencies} />
                            </Route>
                            <Route exact path="/editnote/:id">
                                <EditNote isNewNote={false} setDependencies={setDependencies} />
                            </Route>
                        </Switch>
                    </>) : <Redirect to={"/login"} />
                    }
                </Route>
            </Switch>
            {/* {editNote && <EditNote closeFunction={editMode}/>} */}
            {/* <button onClick={testFetch}>Test</button> */}
        </div>)

    );
}

export default App;
