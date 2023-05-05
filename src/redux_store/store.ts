import {configureStore} from '@reduxjs/toolkit';
// import uiControlReducer from '../slices/uiControlSlice';
// import exerciseReducer from '../slices/exerciseSlice';
import userReducer from '../services/redux_slices/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    // uiControls: uiControlReducer,
    // exerciseStore: exerciseReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;