// Dependency list:
import React, { useCallback, useEffect, useState } from 'react';
import logo from '../logo.svg';
import { Link, useParams } from 'react-router-dom';
import { X } from 'react-bootstrap-icons';
import axios from 'axios';
import DeleteUser from './DeleteUser';

// TypeScript interfaces:
interface EditUserProps {
    match: any
}

// 'Admin' functional component definition:
const EditUser = (props: EditUserProps) => {
    // variable declaration:
    const [username, setUsername] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState();
    
    let params: any = useParams();

    // onChange methods:
    const onChangeSetUsername = (e: any) => {
        setUsername(e.target.value);
    }

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
                // console.log('Profile GET res.data: ', res.data);
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

    // 'handleDeleteScore' function definition:
    const handleDeleteUser = () => {
        console.log('EditUser handleDeleteUser() fired!');
        // this.props.history.push('/', this.state);
        // let path = 'http://localhost:3000/'
        // window.location.href = path;
    }

    // 'onSubmit' function definiton:
    const onSubmit = (e: any) => {
        e.preventDefault();
        const editUser = {
            username: username,
        };
        console.log('EditUser onSubmit() fired: ', editUser);
        axios.put(`http://localhost:4000/api/users/${params.id}`, editUser)
            .then(res => console.log(res.data));

        let path = 'http://localhost:3000/profile/' + params.id;
        window.location.href = path;
    }

    // 'useEffect' hook definition:
    useEffect(() => {
        console.log('EditUser useEffect() hook fired!');

        return getUser(props);
    }, [getUser, isMounted, username, props, params]);
    
    return(
    
        <div>
            <span style={{display: "flex"}}>
                <img src={logo} alt="" style={{width: "50px", border: "2px solid black", borderRadius: "50%", margin: "0px 5px"}}/>
                <h2>{username}'s profile</h2>
                <Link to={"/profile/" + params.id}>
                    <X color="black" size={25} style={{margin: "0px 5px"}} />
                </Link>
            </span>
            <br/>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input  type="text"
                            className="form-control"
                            value={username}
                            onChange={onChangeSetUsername}
                            data-placeholder={username}
                            />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input  type="text"
                            className="form-control"
                            />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input  type="text"
                            className="form-control"
                            />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Profile" className="btn btn-success" style={{marginRight: 10}} />
                    <DeleteUser user={props.match.params.id} unmount={handleDeleteUser} />
                </div>
            </form>
      </div>
    );
}

export default EditUser;