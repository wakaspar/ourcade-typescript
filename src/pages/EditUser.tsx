// Dependency list:
import React, { useCallback, useEffect, useState } from 'react';
// import logo from '../logo.svg';
import { Link, useParams } from 'react-router-dom';
import { At, CardImage, Envelope, Lock, PersonCircle, X } from 'react-bootstrap-icons';
import axios from 'axios';
import DeleteUser from './DeleteUser';
import { BigCard } from '../components/AuthForms';

// TypeScript interfaces:
interface EditUserProps {
    match: any
}

// <EditUser /> functional component definition:
const EditUser = (props: EditUserProps) => {
  // Variable declaration:
  let params: any = useParams();
  // state getters/setters for <EditUser/>:
  const [avatar, setAvatar] = useState();
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [isMounted, setIsMounted] = useState(false);
  const [username, setUsername] = useState('');
  
  // onChange methods:
  const onChangeSetAvatar = (e: any) => {
    console.log('e.target.files[0]: ', e.target.files[0]);
    setAvatar(e.target.files[0]);
  }
  const onChangeSetEmail = (e: any) => {
    setEmail(e.target.value);
  }
  const onChangeSetUsername = (e: any) => {
    setUsername(e.target.value);
  }

  // 'setUser' functon definition:
  const setUser = useCallback(
    (res: any) => {
      setUsername(res.username);
      setEmail(res.email);
      setAvatar(res.avatar);
    },[]
  );

  // 'getUser' function definition:
  const getUser = useCallback(
    (props: { match: { params: { id: string; }; }; }) => {
      console.log('avatar: ', avatar);
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

  // 'handleDeleteScore' function definition:
  // TODO: this.props.history.push needs to be rewritten for a functional component...
  const handleDeleteUser = () => {
    // this.props.history.push('/', this.state);
  }

  // 'onSubmit' function definiton:
  const onSubmit = (e: any) => {
    e.preventDefault();
    const editUser = {
      username: username,
      email: email,
      avatar: avatar,
    };
    console.log('editUser before PUT: ', editUser);
    debugger;
    axios.put(`http://localhost:4000/api/users/${params.id}`, editUser)
    // axios.post(`http://localhost:4000/api/users/${params.id}`, editUser)
    console.log('editUser after PUT: ', editUser);
    // redirect after PUT:
    let path = 'http://localhost:3000/profile/' + params.id;
    window.location.href = path;
  }

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
        <Link to={"/user/" + params.id} className="nav-link">
          <button className="btn btn-dark btn-sm">
          <X size={20} style={{margin: "0px 3px 1px 0px"}} />
          Cancel
          </button>
        </Link>
      </div>
      <form action={`http://localhost:4000/api/users/${params.id}`} 
            onSubmit={onSubmit} 
            method="POST" 
            encType="multipart/form-data">
        <br/>
        <div className="form-group row mb-4">
          <div className="col-6" style={{ display:"flex" }}>
            <At size={25} style={{margin: "0 1.25%"}} />
            <input  type="text"
                    className="form-control"
                    value={username}
                    onChange={onChangeSetUsername}
                    data-placeholder={username}
            />
          </div>
          <div className="col-6" style={{ display:"flex" }}>
            <Envelope size={25} style={{margin: "0 1.25%"}} />
            <input  type="text"
                    className="form-control"
                    value={email}
                    onChange={onChangeSetEmail}
                    data-placeholder={email}
            />
          </div>
        </div>
        <div className="form-group row mb-4">
          <div className="col-6" style={{ display:"flex" }}>
            <Lock size={25} style={{margin: "0 1.25%"}} />
            <input  type="text"
                    className="form-control"
                    placeholder="Password"
            />
          </div>
          <div className="col-6" style={{ display:"flex" }}>
            <Lock size={25} style={{margin: "0 1.25%"}} />
            <input  type="text"
                    className="form-control"
                    placeholder="Password again"
            />
          </div>
        </div>
        <div className="form-group row mb-4">
          <div className="col-6" style={{ display:"flex" }}>
            <CardImage size={25} style={{margin: "0 1.25%"}} />
            <input  type="file"
                    name="avatar"
                    onChange={onChangeSetAvatar}
            />
          </div>
        </div>


        <div className="form-group">
          <input type="submit" value="Save" className="btn btn-dark" style={{marginRight: 10}} />
          <DeleteUser user={props.match.params.id} unmount={handleDeleteUser} />
        </div>
      </form>
    </BigCard>
  );
}

export default EditUser;