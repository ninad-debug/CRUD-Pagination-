import React from 'react'
import { getUsername } from '../utils'
import { Navigate } from 'react-router-dom'

const PublicRoutes = ({ component }) => {
   getUsername();

  return (
    !getUsername() ? component  : <Navigate to="/"/>
  )
}

export default PublicRoutes;