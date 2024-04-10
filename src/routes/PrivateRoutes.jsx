import React from 'react'
import { getUsername } from '../utils'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({ component }) => {
  return (
    getUsername() ? component : <Navigate  to="/signin"/>
  )
}

export default PrivateRoutes;