import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData:null,
    status:false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login:(state,action)=>{
        state.status=true;
        state.userData=action.payload.userData;
    },
    logout:(state)=>{
        state.status=false;
        state.userData=null;
    },
    register:(state,action)=>{
      state.status=true;
      state.userData=action.payload.userData;
    }
  },
})

export const { login,logout,register } = authSlice.actions

export default authSlice.reducer