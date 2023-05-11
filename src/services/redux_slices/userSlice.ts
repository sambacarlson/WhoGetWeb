import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userAsyncState, userType } from '../types';
import axios from 'axios';

const initialState: userAsyncState = {
  loading: false,
  users: [],
  error: '',
  userToken: '',
}

const requestHelper = (method: string, url: string) => axios({
  method: method ? method : 'patch',
  url: url,
  withCredentials: false,
  // headers: {
  //   'Content-Type': 'application/json'
  // }
});

// axios.defaults.headers.patch['Access-Control-Allow-Origin'] = '*';
// fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', () => {
  // return axios.get('https://whoget-api.onrender.com/api/users').then(response => response.data)
  return requestHelper('get', 'http://127.0.0.1:4000/api/users/').then(response => response.data)
})

// ban users
export const banUsers = createAsyncThunk('users/banUser', (id: string) => {
  console.log('submitted id: ', id);
  // return axios.patch(`https://whoget-api.onreder.com/api/users/${id}`).then(response => response.data)
  return axios.patch(`http://127.0.0.1:4000/api/users/${id}`).then(response => console.log('response:', response.data))
})

// unban users
export const unbanUsers = createAsyncThunk('users/unbanUser', (id: string) => {
  // return axios.patch(`https://whoget-api.onreder.com/api/users/${id}`).then(response => response.data)
  return axios.patch(`http://127.0.0.1:4000/api/users/${id}`).then(response => response.data)
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userToken = action.payload
    }
  },
  extraReducers: (builder) => {
    // Fetch users
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false,
        state.users = action.payload,
        state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false,
        state.users = [],
        state.error = action.error.message !== undefined ? action.error.message : 'an error occurred';
    });
    // Ban users
    builder.addCase(banUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(banUsers.fulfilled, (state, action: any) => {
      state.loading = false;
      console.log('payload:', action.payload);
      state.users = state.users.map(user => {
        if (user._id === action.payload) {
          console.log(`${user.username} ban: ${user.status.banned}`);
          return {
            ...user,
            status: {
              banned: true,
              bannedDate: user.updatedAt,
            },
          };
        }
        return user;
      });
      state.error = '';
    });
    builder.addCase(banUsers.rejected, (state, action) => {
      state.loading = false,
        // state.users = [],
        state.error = action.error.message !== undefined ? action.error.message : 'an error occurred';
    });
    // Unban users
    builder.addCase(unbanUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(unbanUsers.fulfilled, (state, action) => {
      state.loading = false,
        state.users = state.users.map(user => {
          if (user._id === action.payload) {
            return {
              ...user,
              status: {
                ...user.status,
                banned: false,
                bannedDate: "",
              },
            };
          }
          return user;
        });
      state.error = '';
    });
    builder.addCase(unbanUsers.rejected, (state, action) => {
      state.loading = false,
        // state.users = [],
        state.error = action.error.message !== undefined ? action.error.message : 'an error occurred';
    });
  },
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
