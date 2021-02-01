// Dependency list:
import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Card, Form, Input, Button, Error } from '../components/AuthForms';
import icon from "../pins-icon.png"

// <Signup/> functional component definition:
const Signup = () => {
  // Variable declaration:
  // component state varaibles:
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const { setAuthTokens } :any = useAuth();
  // 'useRef' variable:
  const _isMounted = useRef(null);

    // 'postSignup' function definition:
    function postSignup(){
        const newUser = {
            username: username,
            password: password
        }
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
            <Input 
                type="password" 
                value={passwordAgain}
                onChange={e => {
                    setPasswordAgain(e.target.value);
                }}
                placeholder="password again" 
            />   
            <br></br>   
            <Button onClick={postSignup}>Sign up</Button>
          </Form>
          <Link to='/login'>Already have an account?</Link>
          { isError && <Error>The username or password provided were incorrect!</Error> }
        </Card>
    );
}

export default Signup;