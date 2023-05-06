import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { askAsyncState } from '../types';
import axios from 'axios';

const initialState: askAsyncState = {
  loading: false,
  asks: [],
  error: ''
}


export const fetchAsks = createAsyncThunk('user/fetchAsks', ()=>{
  return axios.get('https://whoget-api.onrender.com/api/asks').then(response=>response.data)
}) 
const askSlice = createSlice({
  name: "ask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsks.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchAsks.fulfilled, (state, action) => {
      state.loading = false,
      state.asks = action.payload,
      state.error = '';
    });
    builder.addCase(fetchAsks.rejected, (state, action) => {
      state.loading = false,
      state.asks = [],
      state.error = action.error.message!==undefined? action.error.message: 'an error occurred' ;
    });
  },
})

export default askSlice.reducer;
