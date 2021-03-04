// Dependency list:
import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Card, Form, Error } from '../components/AuthForms';
import icon from "../img/pins-icon.png"

// <Signup/> functional component definition:
const Signup = () => {
  // Variable declaration:
  // component state varaibles:
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  
  const { setAuthTokens } :any = useAuth();
  // 'useRef' variable:
  const _isMounted = useRef(null);

  // 'postSignup' function definition:
  function postSignup(){
    const newUser = {
        email: email,
        username: username,
        password: password,
    }
    console.log('Signup postSignup() newUser: ', newUser);
    axios.post('http://localhost:4000/api/signup', newUser)
    .then(result => {
      if (result.status === 200 || _isMounted.current) {
        console.log('Signup postSignup() result: ', result);
        setLoggedIn(true);
        setAuthTokens(result.data);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
      console.log('error: ', e);
    });
  }
    
  // 'useEffect' hook definition:
  useEffect( () => {
    const redirectIfLogged = async () => {
      if (isLoggedIn) {
        console.log('Signup useEffect() redirect');
        return <Redirect to='/scores' />;
      }
    }
    redirectIfLogged();
  });
    
  // auth-based conditional redirect:
  if (isLoggedIn) {
      console.log('Signup conditional redirect');
      return <Redirect to='/scores' />;
  }

  return(
    <Card>
      <Form>
        <br/>
        <p className="text-muted">Welcome to</p>
        <img src={icon} alt="ourcade-pins-logo" />
        <h1 className="display-4">Ourcade</h1>
        <p className="text-muted">A personal pinball high score application</p>
        <div className="row mb-4">          
          <div className="col-sm-7">
            <input type="email" 
                    className="form-control" 
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Email address"
            />
          </div>         
          <div className="col-sm-5">
            <input type="email" 
                    className="form-control" 
                    value={username}
                    onChange={e => {
                      setUsername(e.target.value);
                    }}
                    placeholder="Username"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-sm-6">
            <input type="password" 
                  className="form-control" 
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
            />
        </div>
        <div className="col-sm-6">
          <input type="password" 
              className="form-control" 
              value={passwordAgain}
              onChange={e => {
                  setPasswordAgain(e.target.value);
              }}
              placeholder="Confirm password"
          />
        </div>
      </div>
      <button onClick={postSignup} className="btn btn-dark">Sign up</button>
      </Form>
      <Link style={{margin: "3% 0"}} to='/login'>Already have an account?</Link>
      { isError && <Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Signup;