// Dependency list:
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BigCard } from '../components/AuthForms';
import { InfoCircleFill } from 'react-bootstrap-icons';
// Backgronud images:
import captainFantastic from "../cap.png";
import laserball from "../laserball.png";
import paragon from "../paragon.png";
import lucky7 from "../lucky7.png";


// TypeScript interfaces:
interface HomeProps {/* * */}
interface HomeState {/* * */}

// <Home /> functional component definition:
const Home = (props: HomeProps, state: HomeState) => {
  const existingTokens = JSON.parse( localStorage.getItem('tokens') !);
  const [authTokens] = useState(existingTokens);

  return(
    <div>
      <main>
        <div style={{ backgroundImage: `url(${captainFantastic})`}} className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light bg-box">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 display-text">Record Your High Scores</h1>
            <p className="lead text-white box-text">And see some cool data about your mad pinball skillz.</p>
            { !authTokens && (
            <Link className="btn btn-light" to="/signup/">
              Sign up
            </Link>
            )}
          </div>
          {/* <p className="lead text-white box-text">And yeah, that's totally Elton John's butt.</p> */}
        </div>
        <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
          <div style={{ backgroundImage: `url(${laserball})`}} className="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden bg-box">
            <div className="my-3 py-3 ">
              <h2 className="display-5 box-text">Personalized Scoreboards</h2>
              <p className="lead box-text">Record your high scores in a user friendly scoreboard.</p>
            </div>
          </div>
          <div style={{backgroundImage: `url(${lucky7})`}} className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden box-text bg-box">
            <div className="my-3 p-3">
              <h2 className="display-5">Create Leagues</h2>
              <p className="lead box-text">Make a league and compare scores with your friends.</p>
              <p className="lead box-text">COMING SOON</p>
            </div>
          </div>
          <div style={{backgroundImage: `url(${paragon})`}} className="bg-primary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden box-text bg-box">
            <div className="my-3 py-3">
              <h2 className="display-5">User Analytics</h2>
              <p className="lead box-text">Know what, when, and where you play best.</p>
              <p className="lead box-text">COMING SOON</p>
            </div>
          </div>
        </div>

        <br/>
        <BigCard> 
          <h5>
            <InfoCircleFill style={{margin: "0px 3px 5px 0px"}}/>
            Welcome to Ourcade
          </h5>
          <p>
            <strong>Ourcade</strong> began as an effort to digitalize the experience 
            of playing in local pinball and arcade leagues.  The brainchild 
            of many late nights at <strong>FreeGoldWatch</strong> in San Francisco,
             this app means to give pinheads a way to track their passion, 
             play with friends, and bring more tools to the pinball community.
          </p>
          <p>
            This app is currently a one-man show and undoubtedly a work of passion.  
            It's an open-source project stored in a public repository on
            Github.  If you have any questions regarding the app or it's development
            , please reach out via the <strong>Contact Us</strong> link below.
          </p>
        </BigCard>

      </main>

      <footer className="container py-3">
        <div className="row">
          <div className="col-6 col-md">
            <h5>Site Map</h5>
            <ul className="list-unstyled text-small">
              <li>
                <Link to="/login/">
                  <a className="link-secondary" href="/login">Login</a>
                </Link>
              </li>
              <li>
                <Link to="/login/">
                  <a className="link-secondary" href="/signup">Signup</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Social</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="link-secondary" href="http://www.instagram.com/wakaspar" target="_blank">Instagram</a>
              </li>
              <li><a className="link-secondary" href="http://www.github.com/wakaspar/ourcade-typescript" target="_blank">Github</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>About</h5>
            <ul className="list-unstyled text-small">
              <li><a className="link-secondary" href="mailto:wakaspar@gmail.com" target="_blank">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </footer>
      <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    </div>
    );
    
}

export default Home;