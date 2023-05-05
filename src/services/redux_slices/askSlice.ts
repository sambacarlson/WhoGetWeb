import {createSlice} from '@reduxjs/toolkit';
import { askType } from '../types';

const initialState = [] as askType[];

const exerciseSlice = createSlice({
  name: 'asks',
  initialState,
  reducers: {
    loadExercises: (state, action) => {
      state = action.payload;
    },
  },
  // extraReducers: builder => {
  //   builder.addCase()
  // },
});

export default exerciseSlice.reducer;
export const {loadExercises} = exerciseSlice.actions;