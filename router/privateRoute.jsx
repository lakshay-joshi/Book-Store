import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';

const PrivateRoute = ({children}) => {
  const {currentUser,loading}=useAuth();
  if(loading){
    return <div>Loading...</div>
  }
  if(currentUser)
  {
    return children;
  }
  return <Navigate to="/login" replace></Navigate>
}

export default PrivateRoute
