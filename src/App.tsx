// Dependency list:
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth'

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateScore from "./pages/CreateScore";
import EditScore from './pages/EditScore';
import Scoreboard from './pages/Scoreboard';

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
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  // 'setTokens' function definition:
  const setTokens = (data :any) => {
    console.log('setTokens(data): ', data);
    localStorage.setItem('tokens', JSON.stringify(data));
    console.log('localStorage.getItem(tokens): ', localStorage.getItem('tokens'));
    setAuthTokens(data);
  }

  // 'logout' function definition:
  const logout = (): any => {
    setAuthTokens('');
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
                    <Link to="/" className="nav-link">Admin</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/scores" className="nav-link">Read Scores</Link>
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
              <Route exact path='/' component={Admin} />                
              <PrivateRoute  path='/admin' component={Admin} />
              <PrivateRoute path ="/scores" component={Scoreboard} />
              <PrivateRoute path ="/create" component={CreateScore} />
              <PrivateRoute path ="/edit/:id" component={EditScore} />
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
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
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
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
            </div>
          </div>
        </Router>
      </AuthContext.Provider>
    )

  }
}

export default App;