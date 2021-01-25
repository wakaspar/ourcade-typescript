// Dependency list:
import React, { useCallback, useEffect, useState, } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// TypeScript interfaces:
interface ProfileProps {
  this: any,
  TesterProps: any,
  TesterState: any,
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
      },
      []
    );

    // 'getUser' function definition:
    const getUser = useCallback(
      (props: { match: { params: { id: string; }; }; }) => {
          console.log('Profile getUser() props: ', props);
          axios.get(`http://localhost:4000/api/users/${params.id}`)
          .then(res => {

              if (res.status === 200 && !isMounted) {
                  console.log('Profile GET res.data: ', res.data);
                  setUser(res.data);
                  setIsMounted(true);
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
           <h2>{ username }'s profile</h2> 

          <div>
            <label>Username: </label>
            <p>{ username }</p>
          </div>

        </div>
    );
}

export default Profile;