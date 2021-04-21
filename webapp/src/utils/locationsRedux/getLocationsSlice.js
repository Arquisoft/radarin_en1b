import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import obtainUserLocations from '../solidAccessing/GetUserLocations';
export const getUserLocation = createAsyncThunk( "locationsSlice/getLocations", async (session, {getState}) => {
    let locations = await obtainUserLocations(session, getState().friends.value);
    return locations;
});

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    status: "idle",
    value: [], //[localizaciones del usuario]
    error: null
  }, reducers: {
    deleteLocation(state, action)  {
      state.value = state.value.filter((location) => {return !(location.name === action.payload.name && location.comment === action.payload.comment);  }); 
      state.value[0].localizaciones = state.value[0].localizaciones.filter((location) => {return !(location.name === action.payload.name && location.comment === action.payload.comment);  }); 
    },
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
export const {deleteLocation} = locationsSlice.actions;
export default locationsSlice.reducer;