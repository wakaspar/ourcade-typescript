// Dependency list:
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth';

// 'PrivateRoute' functional component definition:
const PrivateRoute = ({ component: Component, ...rest } :any) => {    
    const { authTokens } :any = useAuth();

    return(
        <Route 
            {...rest}
            render = { (props) => (
            authTokens ? (
                <Component {...props} />
            ) : (
                <Redirect 
                    to={{ pathname: '/login', state: {referer: props.location} }}
                />
            )
            )}
        />
    );
}

export default PrivateRoute;