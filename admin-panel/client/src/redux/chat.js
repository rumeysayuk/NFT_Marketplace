import {createSlice} from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
   name: 'chat',
   initialState: {
     messages: [],
   },
   reducers: {
       handleMessage: (state, action) => {
          console.log(state, action)
             state.messages.push(action.payload)
       }
   }
})

export const {
   handleMessage
} = layoutSlice.actions

export default layoutSlice.reducer