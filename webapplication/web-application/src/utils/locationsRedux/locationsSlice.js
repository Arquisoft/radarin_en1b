import { createSlice } from '@reduxjs/toolkit';

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    value: [], //[[localizaciones del usuario], [[amigo1], [amigo2], [amigo3]] ]
  },
  reducers: {
    addUserLocations: (state, locations) => {
      // Guardamos las localizaciones del usuario
      state.push(locations);
    },
    addFriendLocations: (state, locations) => {
      if(state.length < 2) {
        state.value[1].push([locations]); //Guardamos las localizaciones de los amigos como arrays dentro del array
      } else {
        state.push([]);
        state.value[1].push([locations]); //Guardamos las localizaciones de los amigos como arrays dentro del array
      }
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUserLocations, addFriendLocations } = locationsSlice.actions;

export default locationsSlice.reducer;