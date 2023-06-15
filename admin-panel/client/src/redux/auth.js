import {createSlice} from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
   name: 'auth',
   initialState: {
      authData: null,
      token: localStorage.getItem("token") ? localStorage.getItem("token") : null
   },
   reducers: {
      handleAuth: (state, action) => {
         localStorage.setItem("token", action.payload.token)
         state.authData = action.payload.authData
         state.token = action.payload.token
      },
      handleLogout: (state, action) => {
         localStorage.clear()
         state.authData = null
         state.token = null
      },
   }
})

export const {
   handleAuth,
   handleLogout
} = layoutSlice.actions

export default layoutSlice.reducer