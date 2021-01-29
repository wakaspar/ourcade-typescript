// Dependency list:
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// TypeScript interface:
interface DeleteUserProps {
    user: any
    unmount: any
}

// 'DeleteUser' functional component definition:
const DeleteUser = (props: DeleteUserProps) => {
    const existingTokens = JSON.parse( localStorage.getItem('tokens') !);
    const [authTokens, setAuthTokens] = useState(existingTokens);

    const onDeleteScore = (e :any) => {
      console.log('DeleteUser onDeleteScore() fired!');
      e.preventDefault();
      axios.delete('http://localhost:4000/api/users/' + props.user)
        .then(res => console.log(res.data));
      setAuthTokens('');
      props.unmount();
    }

    // 'useEffect' hook definition:
    useEffect(() => {
        return console.log('authTokens @ useEffect(): ', authTokens);
    }, [authTokens]);

    return (
        <span>
          <input type="button" onClick={onDeleteScore} value="Delete User" className="btn btn-danger" />
        </span>
    )
}

export default DeleteUser;