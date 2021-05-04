import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getFriendsWebIds from "../solidAccessing/GetFriendsFromPod";
import { isBanned } from "../../api/api";

export const getFriends = createAsyncThunk("friends/getFriends", async (session) => {
  let notBanned = [];
  let friendWebIds = await getFriendsWebIds(session);
  for (let friend of friendWebIds) {
    if (!await isBanned(friend.id)) {
      notBanned.push(friend);
    }
  }
  return notBanned;
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