import { configureStore } from '@reduxjs/toolkit'
import authReducers from './authSlice.js'


export default configureStore({
  reducer: {
    auth:authReducers
},
})
