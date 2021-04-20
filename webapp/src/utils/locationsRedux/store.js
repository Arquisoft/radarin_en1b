import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './getLocationsSlice';
import friendsReducer from '../friendsRedux/friendsSlice';

export default configureStore({
  reducer: {
      locations: locationsReducer,
      friends: friendsReducer
  },
});