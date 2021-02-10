// Dependency list:
import React, { useCallback, useEffect, useState, } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { At, CardImage, Envelope, Lock, Pencil, PersonCircle } from 'react-bootstrap-icons';
import { BigCard } from '../components/AuthForms';

// TypeScript interfaces:
interface ProfileProps {
  match: any
}

// <Profile /> functional component definition:
const Profile = (props: ProfileProps) => {
  // Variable declaration:
  let params :any = useParams();
  // state getters/setters for <Profile />:
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('*********');
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState();

  // 'setUser' functon definition:
  const setUser = useCallback(
    (res: any) => {
      setUsername(res.username);
      setEmail(res.email);
      setPassword(res.password);
      setAvatar(res.avatar);
    },[]
  );

  // 'getUser' function definition:
  const getUser = useCallback(
    (props: { match: { params: { id: string; }; }; }) => {
      axios.get(`http://localhost:4000/api/users/${params.id}`)
        .then(res => {
          if (res.status === 200 && !isMounted) {
            setIsMounted(true);
            setUser(res.data);
          }
        })
        .catch(err => {
          setError(err.message);
          setIsMounted(true);
          console.log('error:', error);
        })
    }, [error, params.id, isMounted, setUser]
  );

  // 'useEffect' hook definition:
  useEffect(() => {
    return getUser(props);
  }, [getUser, isMounted, username, props, params]);

  // JSX rendered:
  return(
    <BigCard>
      <div style={{display: "inline-flex"}}>
        <h2 style={{margin: "auto"}}>
          <PersonCircle style={{margin: "0px 3px 5px 0px"}} />
          { username }'s profile
        </h2>
        <Link to={"/user/edit/" + params.id} className="nav-link">
          <button className="btn btn-dark btn-sm">
            <Pencil size={18} style={{margin: "0px 4px 4px 0px"}} />
            Edit profile
          </button>
        </Link>
      </div>
      <div>
        <br/>

        <div className="row mb-4">
          <div className="col-6" style={{ display:"flex" }}>
            <At size={25} style={{margin: "0 1.25%"}} />
            <p>{ username }</p>
          </div>
          <div className="col-6" style={{ display:"flex" }}>
            <Envelope size={25} style={{margin: "0 1.25%"}} />
            <p>{ email }</p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-6" style={{ display:"flex" }}>
            <Lock size={25} style={{margin: "0 1.25%"}} />
            <p>{ password ? password : '*********' }</p>
          </div>
          <div className="col-6" style={{ display:"flex" }}>
            <Lock size={25} style={{margin: "0 1.25%"}} />
            <p>{ password ? password : '*********' }</p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-6" style={{ display:"flex" }}>
            <CardImage size={25} style={{margin: "0 1.25%"}} />
            <p>{ avatar ? avatar : 'No avatar uploaded' }</p>
          </div>
        </div>

      </div>
    </BigCard>
  );
}

export default Profile;