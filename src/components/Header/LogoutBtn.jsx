import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../Appwrite/auth.js'
import {logout} from '../../store/authSlice.js'

const LogoutBtn = () => {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout()
      .then(() => dispatch(logout()))
      .catch(error => {
        console.error('API Error:', error.response);
      });
  }
  
  return (
    <button
      className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn
