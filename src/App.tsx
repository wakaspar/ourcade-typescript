import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import icon from "./pins-icon.png"

import CreateScore from "./components/create-score.component";
import EditScore from "./components/edit-score.component";
import DeleteScore from "./components/delete-score.component";
import ScoresList from "./components/scores-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <a className="navbar-brand" href="/" target="_blank">
             <img src={icon} alt="Ourcade React" />
           </a>
           <Link to="/" className="navbar-brand">Ourcade-TypeScript</Link>
           <div className="collpase navbar-collapse">
             <ul className="navbar-nav mr-auto">
               <li className="navbar-item">
                 <Link to="/" className="nav-link">Scoreboard</Link>
               </li>
               <li className="navbar-item">
                 <Link to="/create" className="nav-link">Create Score</Link>
               </li>
             </ul>
           </div>
         </nav>
         <br/>
         {/* Route Definitons - NOTE: keep inside bootstrap container  */}
         <Route path ="/" exact component={ScoresList} />
         <Route path ="/edit/:id" component={EditScore} />
         <Route path ="/create" component={CreateScore} />
         <Route path ="/delete/:id" component={DeleteScore} />
        </div>
      </Router>
    );
  }
}

export default App;
