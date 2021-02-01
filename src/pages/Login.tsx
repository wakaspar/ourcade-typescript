// Dependency list:
import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Card, Form, Input, Button, Error } from '../components/AuthForms';
import icon from "../pins-icon.png"

// 'Login' functional component definition
const Login = (props :any) => {
  // Variable declaration:
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // AuthContext API:
  const { setAuthTokens }: any = useAuth();
  // 'useRef' variable:
  const _isMounted = useRef(null);

  // TODO: referer is hardcoded into <Redirect /> below, fix props.location.state...
  // const referer = props.location.state.referer || '/scores';
  // const [referer, setReferer] = useState('/');

  // 'postLogin' function definition:
  function postLogin(){
    const userLogin = {
      username: username,
      password: password
    }
    axios.post('http://localhost:4000/api/login', userLogin)
    .then(res => {
      if (res.status === 200 || _isMounted.current) {
        setLoggedIn(true);                
        setAuthTokens(res.data);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }
    
  // 'useEffect' hook definition:
  useEffect( () => {
    const redirectIfLogged = async () => {
      if (isLoggedIn) {
        return <Redirect to='/scores' />;
      }  
    }
    redirectIfLogged();
  });

  // auth-based conditional redirect:
  if (isLoggedIn) {
    return <Redirect to='/scores' />;
  }

  return(
    <Card>
      <Form>
        <img src={icon} alt="ourcade-pins-logo" />
        <Input 
          type="email"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign in</Button>
      </Form>
      <Link to='/signup'>Don't have an account?</Link>
      { isError && <Error>The username / password provided were incorrect</Error> }
    </Card>
  );
}

export default Login;