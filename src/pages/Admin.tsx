// Dependency list:
import React from 'react';

// TypeScript interfaces:
interface AdminProps {
  this: any,
  TesterProps: any,
  TesterState: any,
}

// 'Admin' functional component definition:
const Admin = (props :AdminProps) => {
    return(
        <div>Admin Page (user profile)</div>
    );
}

export default Admin;