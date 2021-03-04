// Dependency list:
import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth'
// Public Components:
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// Authorized User Components:
import UserDashboard from './pages/UserDashboard';
import Profile from "./pages/Profile";
import EditUser from './pages/EditUser';
// Authorized Score Components:
import CreateScore from "./pages/CreateScore";
import EditScore from './pages/EditScore';
import Scoreboard from './pages/Scoreboard';
// Styles & icons:
import "bootstrap/dist/css/bootstrap.min.css";
import { Globe, 
         PersonCircle, 
         PersonPlusFill, 
         BoxArrowInRight, 
         PlusCircle,
         BoxArrowRight,
         GraphUp} from 'react-bootstrap-icons';
import './App.css';
import icon from "./img/pins-icon.png"
import axios from 'axios';


// TypeScript interfaces:
interface AppProps { /*...*/ }
interface AppState { 
    username: string
    password: string
    id: string
    isAuthenticated: boolean
}

// <App /> functional component definiton:
function App(props :AppProps, state: AppState)  {
  // Variable declarations; localStorage variables for <AuthContext />:
  const existingTokens = JSON.parse( localStorage.getItem('tokens') !);
  const existingUserID = JSON.parse( localStorage.getItem('user') !);
  const existingUserName = JSON.parse( localStorage.getItem('name') !);
  // State getters/setters for <App />:
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [currentUserID, setCurrentUserID] = useState(existingUserID);
  const [username, setUsername] = useState(existingUserName);
  // error handling & clean-up variables:
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState();
  
  // 'setTokens' function definition:
  const setTokens = (data: any) => {
    // set localStorage user data:
    localStorage.setItem('tokens', JSON.stringify(data.hash));
    localStorage.setItem('user', JSON.stringify(data._id));
    localStorage.setItem('name', JSON.stringify(data.username));
    // set <App/> state user data:
    setCurrentUserID(data._id);
    setUsername(data.username);
    setAuthTokens(data.hash);
  }

  // 'logout' function definition:
  const logout = (): any => {
    // clear <App /> state user data:
    setAuthTokens('');
    setCurrentUserID('');
    setUsername('')
    // clear localStorage user data:
    localStorage.clear();
    // force redirect to <Home/>:
    // TODO: quick and dirty, better way is using Router's <Redirect />...
    let path = 'http://localhost:3000/'
    window.location.href = path;
  }

  // 'setUser' functon definition:
  const setUser = useCallback(
    (res: any) => {
        setUsername(res.username);
    },[]
  );

  // 'getUser' functon definition:
  const getUser = useCallback( (id: any) => {
        axios.get(`http://localhost:4000/api/users/${id}`)
        .then(res => {
            if (res.status === 200 && !isMounted) {
                setIsMounted(true);
                setUser(res.data);
            }
        })
        .catch(err => {
            setError(err.message);
            setIsMounted(true);
            console.log('error:', error);
        })
    },
    [error, isMounted, setUser]
  );

  // 'useEffect' hook definiton:
  useEffect( () => {
    if (authTokens) {
      return getUser(currentUserID);
    }
  });

  // JSX rendered via auth-based conditional:
  if(authTokens){
    // Auth'ed user return:
    return (    
      <AuthContext.Provider value={ { authTokens, setAuthTokens: setTokens } }>
         <Router>
          <main className="container-fluid">
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="oc-title">
                 <Link to="/" className="navbar-brand"><img src={icon} alt="OC-TS" />Ourcade</Link>
                </div>
                <div className="collpase navbar-collapse">
                  <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                      <Link to="/create" className="nav-link">
                        <PlusCircle className="nav-icon"/>
                        Add a score
                      </Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/scores" className="nav-link">
                        <Globe className="nav-icon"/>
                        Global scoreboard
                      </Link>
                    </li>
                    <li className="navbar-item">
                      <Link to={"/user/" + currentUserID + "/dash/"} className="nav-link">
                        <GraphUp className="nav-icon"/>
                        {username}'s scoreboard
                      </Link>
                    </li>
                    <li className="navbar-item">
                      <Link to={"/user/" + currentUserID} className="nav-link">
                        <PersonCircle className="nav-icon"/>
                        {username}
                      </Link>
                    </li>                    
                    <button onClick={logout} className="btn btn-dark btn-sm">
                      <BoxArrowRight className="nav-logout-icon"/>
                      Logout
                    </button>
                  </ul>
                </div>
              </nav>
              <br/>
              <Route exact path="/" component={Home} />                
              <PrivateRoute path="/user/:id/dash" component={UserDashboard} />                
              <PrivateRoute exact path="/user/:id" component={Profile} />
              <PrivateRoute path="/user/edit/:id" component={EditUser} />
              <PrivateRoute path="/scores" component={Scoreboard} />
              <PrivateRoute path="/create" component={CreateScore} />
              <PrivateRoute path="/edit/:id" component={EditScore} />
            </div>
            <footer>
              <p>&copy; 2021 Friendly Ghost Industries</p>
            </footer>
          </main>
        </Router>
      </AuthContext.Provider>
    );
  } else {
    // Non-auth'ed user return:
    return (
      <AuthContext.Provider value={ { authTokens, setAuthTokens: setTokens } }>
        <Router>
          <main className="container-fluid">
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="oc-title">
                 <Link to="/" className="navbar-brand"><img src={icon} alt="OC-TS" />Ourcade</Link>
                </div>
                <div className="collpase navbar-collapse">
                  <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/login" className="nav-link">
                      <BoxArrowInRight   />
                      Login
                    </Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/signup" className="nav-link">
                      <PersonPlusFill   />
                      Sign up
                    </Link>
                  </li>
                  </ul>
                </div>
              </nav>
              <br/>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </div>
            <footer>
              <p>&copy; 2021 Friendly Ghost Industries</p>
            </footer>
          </main>
        </Router>
      </AuthContext.Provider>
    )

  }
}

export default App;