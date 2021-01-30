// Dependency list:
import React, { useCallback, useEffect, useState } from 'react';
// import logo from '../logo.svg';
import { Link, useParams } from 'react-router-dom';
import { PersonCircle, X } from 'react-bootstrap-icons';
import axios from 'axios';
import DeleteUser from './DeleteUser';
import { Button } from '../components/AuthForms';

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
    }

    // 'onSubmit' function definiton:
    const onSubmit = (e: any) => {
        e.preventDefault();
        const editUser = {
            username: username,
        };
        axios.put(`http://localhost:4000/api/users/${params.id}`, editUser)
            .then(res => console.log(res.data));
        let path = 'http://localhost:3000/profile/' + params.id;
        window.location.href = path;
    }

    // 'useEffect' hook definition:
    useEffect(() => {
        return getUser(props);
    }, [getUser, isMounted, username, props, params]);
    
    // JSX rendered:
    return(
        <div>
            <div style={{display: "inline-flex"}}>
                <h2>
                    <PersonCircle style={{margin: "0px 3px 5px 0px"}} />
                    { username }'s profile
                </h2>

                <Link to={"/profile/" + params.id} className="nav-link">
                    <Button>
                    <X style={{margin: "0px 4px 3px 0px"}} />
                    leave edit mode
                    </Button>
                </Link>
            </div>

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