import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getFriendsWebIds from '../solidAccessing/GetFriendsFromPod';

export const getFriends = createAsyncThunk("friends/getFriends", async (session) => {
  return await  getFriendsWebIds(session);
});

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    status: "idle",
    value: [], //[[amigos del usuario]
    error: null
  },
  extraReducers: {
    [getFriends.pending]: (state, action) => {
      state.status = "pending";
    },
    [getFriends.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.value = state.value.concat(action.payload); 
    },[getFriends.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
})

// Action creators are generated for each case reducer function
export default friendsSlice.reducer;