// Dependency list:
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth'

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateScore from "./pages/CreateScore";
import EditScore from './pages/EditScore';
import Scoreboard from './pages/Scoreboard';
import UserDashboard from './pages/UserDashboard';

import { Button } from './components/AuthForms';
import "bootstrap/dist/css/bootstrap.min.css";
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
  const existingUser = JSON.parse( localStorage.getItem('user') !);

  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [currentUser, setCurrentUser] = useState(existingUser);
  
  // 'setTokens' function definition:
  const setTokens = (data: any) => {
    localStorage.setItem('tokens', JSON.stringify(data.hash));
    localStorage.setItem('user', JSON.stringify(data._id));
    
    console.log('localStorage.getItem(tokens): ', localStorage.getItem('tokens'));
    console.log('localStorage.getItem(user): ', localStorage.getItem('user'));
    
    setCurrentUser(data._id);
    setAuthTokens(data.hash);
  }

  // 'logout' function definition:
  const logout = (): any => {
    setAuthTokens('');
    setCurrentUser('');
  }

  // auth-based conditional render:
  if(authTokens){
    // auth'ed user return:
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
                    <Link to={"/profile/" + currentUser} className="nav-link">User Profile</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/scores" className="nav-link">All Scores</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Score</Link>
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
              <PrivateRoute path="/scores" component={Scoreboard} />
              <PrivateRoute path="/create" component={CreateScore} />
              <PrivateRoute path="/edit/:id" component={EditScore} />
            </div>
          </div>
        </Router>
      </AuthContext.Provider>
    );

  } else {
    // non-auth'ed user return:
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