import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import obtainUserLocations from '../solidAccessing/GetUserLocations';
export const getUserLocation = createAsyncThunk( "locationsSlice/getLocations", async (session, {getState}) => {
    console.log(getState().friends.value);
    return await obtainUserLocations(session, getState().friends.value);
});

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    status: "idle",
    value: [], //[localizaciones del usuario]
    error: null
  },extraReducers:{
    [getUserLocation.pending]: (state, action) => {
      state.status = "pending";
    },
    [getUserLocation.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.value = action.payload; //Guardamos las localizaciones de los amigos como arrays dentro del array
    },[getUserLocation.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  }
})

// Action creators are generated for each case reducer function
export default locationsSlice.reducer;