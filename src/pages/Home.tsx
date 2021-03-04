// Dependency list:
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BigCard } from '../components/AuthForms';
import { InfoCircleFill, MapFill, RssFill } from 'react-bootstrap-icons';
// Backgronud images:
import captainFantastic from "../img/cap.png";
import blackKnight from "../img/blackKnight.png";
import laserball from "../img/laserball.png";
import paragon from "../img/paragon.png";
import lucky7 from "../img/lucky7.png";


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
        <div style={{ backgroundImage: `url(${laserball})`}} className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center text-white bg-light laserball">
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
          <div style={{ backgroundImage: `url(${blackKnight})`}} className="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden blackKnight">
            <div className="my-3 py-3 ">
              <h2 className="display-5 display-text">Personalized Scoreboards</h2>
              <p className="lead box-text">Track your scores from a user friendly dashboard.</p>
            </div>
          </div>
          <div style={{backgroundImage: `url(${lucky7})`}} className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden box-text lucky7">
            <div className="my-3 p-3">
              <h2 className="display-5 display-text">Create Leagues</h2>
              <p className="lead box-text">Make leagues and compare scores with your friends.</p>
              <p className="lead box-text">COMING SOON</p>
            </div>
          </div>
          <div style={{backgroundImage: `url(${paragon})`}} className="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden box-text paragon">
            <div className="my-3 py-3">
              <h2 className="display-5 display-text">User Analytics</h2>
              <p className="lead box-text">Know what, when, and where you play best.</p>
              <p className="lead box-text">COMING SOON</p>
            </div>
          </div>
        </div>

        <BigCard> 
          <h5>
            <InfoCircleFill className="nav-icon"/>
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
      <br/>
      <BigCard>
        <footer className="container py-3">
          <div className="row">
            <div className="col-6 col-md">
              <h5>
                <MapFill className="nav-icon"/>
                Site Map
              </h5>
              <ul className="list-unstyled text-small">
                <li>
                  <Link className="link-secondary" to="/login">Login</Link>
                </li>
                <li>
                  <Link className="link-secondary" to="/signup">Signup</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>
                <RssFill className="nav-icon"/>
                Social
              </h5>
              <ul className="list-unstyled text-small">
                <li>
                  <a className="link-secondary" href="http://www.instagram.com/wakaspar" target="_blank">Instagram</a>
                </li>
                <li><a className="link-secondary" href="http://www.github.com/wakaspar/ourcade-typescript" target="_blank">Github</a></li>
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>
                <InfoCircleFill className="nav-icon"/>
                About
              </h5>
              <ul className="list-unstyled text-small">
                <li><a className="link-secondary" href="mailto:wakaspar@gmail.com" target="_blank">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </BigCard>

      <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    </div>
    );
    
}

export default Home;