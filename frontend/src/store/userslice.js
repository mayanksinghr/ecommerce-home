import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
  }
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
     setUserDeatails:(state,action)=>{
        state.user = action.payload
        
      console.log("userDetails",action.payload);
     }
    }
  })
  
  //Action creators are generated for each case reducer function
  export const {setUserDeatails} = userSlice.actions
  
  export default userSlice.reducer 
