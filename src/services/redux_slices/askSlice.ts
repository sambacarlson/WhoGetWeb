import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { askAsyncState, askType } from '../types';
import axios from 'axios';

const initialState: askAsyncState = {
  loading: false,
  asks: [],
  error: ''
}


export const fetchAsks = createAsyncThunk('asks/fetchAsks', () => {
  // return axios.get('https://whoget-api.onrender.com/api/asks').then(response => response.data)
  return axios.get('http://127.0.0.1:4000/api/asks').then(response => response.data)
})
export const hideAsks = createAsyncThunk('asks/hideAsks', (id: string) => {
  // return axios.patch(`https://whoget-api.onreder.com/api/asks/${id}`).then(response => response.data)
  return axios.patch(`http://127.0.0.1:4000/api/asks/${id}`).then(response => response.data)
})

export const unhideAsks = createAsyncThunk('asks/unhideAsks', (id: string) => {
  // return axios.patch(`https://whoget-api.onreder.com/api/asks/${id}`).then(response => response.data)
  return axios.patch(`http://127.0.0.1:4000/api/asks/${id}`).then(response => response.data)
})

const askSlice = createSlice({
  name: "ask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch asks
    builder.addCase(fetchAsks.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchAsks.fulfilled, (state, action: PayloadAction<askType[]>) => {
      state.loading = false,
        state.asks = action.payload,
        state.error = '';
    });
    builder.addCase(fetchAsks.rejected, (state, action) => {
      state.loading = false,
        state.asks = [],
        state.error = action.error.message !== undefined ? action.error.message : 'an error occurred';
    });

    // hide asks
    builder.addCase(hideAsks.pending, state => {
      state.loading = true;
      state.asks = [];
      state.error = "";
    });
    builder.addCase(hideAsks.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false,
        state.asks = state.asks.map(ask => {
          if (ask._id === action.payload) {
            return {
              ...ask,
              status: {
                ...ask.status,
                hidden: true,
                hiddenDate: ask.updatedAt
              },
            };
          }
          return ask;
        });
      state.error = '';
    });
    builder.addCase(hideAsks.rejected, (state, action) => {
      state.loading = false,
        // state.asks = [],
        state.error = action.error.message !== undefined ? action.error.message : 'an error occurred';
    });

    // unhide asks
    builder.addCase(unhideAsks.pending, state => {
      state.loading = true;
    });
    builder.addCase(unhideAsks.fulfilled, (state, action) => {
      state.loading = false,
        state.asks = state.asks.map(ask => {
          if (ask._id === action.payload) {
            return {
              ...ask,
              status: {
                ...ask.status,
                hidden: false,
                hiddenDate: ""
              },
            };
          }
          return ask;
        });
      state.error = '';
    });
    builder.addCase(unhideAsks.rejected, (state, action) => {
      state.loading = false,
        // state.asks = [],
        state.error = action.error.message !== undefined ? action.error.message : 'an error occurred';
    });
  },
})

export default askSlice.reducer;
