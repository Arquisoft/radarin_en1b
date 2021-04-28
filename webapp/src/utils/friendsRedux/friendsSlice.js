import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getFriendsWebIds from "../solidAccessing/GetFriendsFromPod";

export const getFriends = createAsyncThunk("friends/getFriends", async (session) => {
  let friendWebIds = await getFriendsWebIds(session);
  return friendWebIds;
});

export const friendsSlice = createSlice({
  name: "friends",
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
      state.value = action.payload; 
    },[getFriends.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export default friendsSlice.reducer;