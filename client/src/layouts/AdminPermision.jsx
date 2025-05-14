import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

const AdminPermision = ({ children }) => {
  const user = useSelector(state => state.user)
  return (
    <>
      {
        isAdmin(user.role) ? children : <p className='text-one-orginal bg-red-100 p-4'> Do Not Have Permision</p>
      }
    </>
  )
}

export default AdminPermision