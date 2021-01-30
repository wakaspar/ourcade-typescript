// Dependency list:
import React, { useState } from 'react';
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
// Styles:
import { Button } from './components/AuthForms';
import "bootstrap/dist/css/bootstrap.min.css";
import { PersonCircle, PlusCircleFill, Globe } from 'react-bootstrap-icons';
import './App.css';
import icon from "./pins-icon.png"


// TypeScript interfaces:
interface AppProps { /*...*/ }

interface AppState { 
    username: string
    password: string
    id: string
    isAuthenticated: boolean
}

// 'App' functional component definiton:
function App(props :AppProps, state: AppState)  {
  
  const existingTokens = JSON.parse( localStorage.getItem('tokens') !);
  const existingUserID = JSON.parse( localStorage.getItem('user') !);
  const existingUserName = JSON.parse( localStorage.getItem('name') !);

  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [currentUser, setCurrentUser] = useState(existingUserID);
  const [username, setUsername] = useState(existingUserName);
  
  // 'setTokens' function definition:
  const setTokens = (data: any) => {
    localStorage.setItem('tokens', JSON.stringify(data.hash));
    localStorage.setItem('user', JSON.stringify(data._id));
    localStorage.setItem('name', JSON.stringify(data.username));
    
    console.log('localStorage.getItem(tokens): ', localStorage.getItem('tokens'));
    console.log('localStorage.getItem(user): ', localStorage.getItem('user'));
    console.log('localStorage.getItem(name): ', localStorage.getItem('name'));
    
    setCurrentUser(data._id);
    setUsername(data.username);
    setAuthTokens(data.hash);
  }

  // 'logout' function definition:
  // TODO: setters aren't clearing localStorage, so the .clear() method below handles it for me...
  // TODO: ...otherwise, i get a CORS error
  const logout = (): any => {
    setAuthTokens('');
    setCurrentUser('');
    setUsername('')
    localStorage.clear();
  }

  // JSX rendered via auth-based conditional:
  if(authTokens){
    // Auth'ed user return:
    return (    
      <AuthContext.Provider value={ { authTokens, setAuthTokens: setTokens } }>
         <Router>
          <div>
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="oc-title">
                 <Link to="/" className="navbar-brand"><img src={icon} alt="OC-TS" />Ourcade</Link>
                </div>
                <div className="collpase navbar-collapse">
                  <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                      <Link to="/scores" className="nav-link">
                        <Globe style={{margin: "0px 3px 5px 0px"}} />
                        Scoreboard
                      </Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/create" className="nav-link">
                        <PlusCircleFill size={15} style={{margin: "0px 3px 5px 0px"}}/>
                        Add a score
                      </Link>
                    </li>
                    <li className="navbar-item">
                      <Link to={"/profile/" + currentUser} className="nav-link">
                        <PersonCircle style={{margin: "0px 3px 5px 0px"}} />
                        {username}
                      </Link>
                    </li>
                    <li className="navbar-item">
                      <Button onClick={logout}>Log out</Button>
                    </li>
                  </ul>
                </div>
              </nav>
              <br/>
              <Route exact path="/" component={UserDashboard} />                
              <PrivateRoute path="/profile/:id" component={Profile} />
              <PrivateRoute path="/user/edit/:id" component={EditUser} />
              <PrivateRoute path="/scores" component={Scoreboard} />
              <PrivateRoute path="/create" component={CreateScore} />
              <PrivateRoute path="/edit/:id" component={EditScore} />
            </div>
          </div>
        </Router>
      </AuthContext.Provider>
    );

  } else {
    // Non-auth'ed user return:
    return (
      <AuthContext.Provider value={ { authTokens, setAuthTokens: setTokens } }>
        <Router>
          <div>
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="oc-title">
                 <Link to="/" className="navbar-brand"><img src={icon} alt="OC-TS" />Ourcade</Link>
                </div>
                <div className="collpase navbar-collapse">
                  <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/signup" className="nav-link">Signup</Link>
                  </li>
                  </ul>
                </div>
              </nav>
              <br/>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </div>
          </div>
        </Router>
      </AuthContext.Provider>
    )

  }
}

export default App;