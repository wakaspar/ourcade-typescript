// Dependency list:
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// TypeScript interface:
interface DeleteUserProps {
  user: any
  unmount: any
}

// <DeleteUser /> functional component definition:
const DeleteUser = (props: DeleteUserProps) => {
  // Variable declaration:
  // current user token in localStorage:
  const existingTokens = JSON.parse( localStorage.getItem('tokens') !);
  // state getters/setters for <DeleteUser />:
  const [authTokens, setAuthTokens] = useState(existingTokens);

  // 'onDeleteScore' function definition:
  const onDeleteScore = (e :any) => {
    e.preventDefault();
    axios.delete('http://localhost:4000/api/users/' + props.user)
      .then(res => console.log(res.data));
    setAuthTokens('');
    props.unmount();
  }

  // 'onDeleteRedirect' function definition:
  const onDeleteRedirect = (authTokens: any) => {
    if (!authTokens) {
      localStorage.clear();
      window.location.reload(false); // TODO: window.location.reload(bool) is deprecated...?
    }
  }

  // 'useEffect' hook definition:
  useEffect(() => {
      return onDeleteRedirect(authTokens)
  }, [authTokens]);

  // JSX rendered:
  return (
    <span>
      <input type="button" onClick={onDeleteScore} value="Delete User" className="btn btn-danger" />
    </span>
  );
}

export default DeleteUser;