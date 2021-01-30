// Dependency list:
import React, { useCallback, useEffect, useState, } from 'react';
import axios from 'axios';
// import logo from '../logo.svg';
import { Link, useParams } from 'react-router-dom';
import { Pencil, PersonCircle } from 'react-bootstrap-icons';
import { Button } from '../components/AuthForms';

// TypeScript interfaces:
interface ProfileProps {
  match: any
}

// 'Admin' functional component definition:
const Profile = (props :ProfileProps) => {
    // variable declaration:
    const [username, setUsername] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState();

    let params :any = useParams();
    
    // 'setUser' functon definition:
    const setUser = useCallback(
      (res: any) => {
          setUsername(res.username);
      },[]
    );

    // 'getUser' function definition:
    const getUser = useCallback(
      (props: { match: { params: { id: string; }; }; }) => {
          axios.get(`http://localhost:4000/api/users/${params.id}`)
          .then(res => {
              if (res.status === 200 && !isMounted) {
                  console.log('Profile GET res.data: ', res.data);
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
      [error, params.id, isMounted, setUser]
    );

    // 'useEffect' hook definition:
    useEffect(() => {
      console.log('Profile useEffect() hook fired!');
      console.log('username: ', username);
      console.log('params: ', params);

      return getUser(props);
    }, [getUser, isMounted, username, props, params]);

    return(
        <div>
          <div style={{display: "inline-flex"}}>
            <h2>
              <PersonCircle style={{margin: "0px 3px 5px 0px"}} />
              { username }'s profile
            </h2>

            <Link to={"/user/edit/" + params.id} className="nav-link">
              <Button>
                <Pencil style={{margin: "0px 4px 3px 0px"}} />
                Edit user profile
              </Button>
            </Link>
          </div>
          
          <br/>

          <div>
            <label>Username: </label>
            <p>{ username }</p>
            <label>Email: </label>
            <p></p>
            <label>Password: </label>
            <p></p>
          </div>

        </div>
    );
}

export default Profile;