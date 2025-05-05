import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import authorizeAxiosIntance from '../../utils/authorizeAxios';
import { API_ROOT } from '../../utils/constants';

const initialState = {
  currentUser: null
};

export const loginUserAPI = createAsyncThunk('user/loginUserAPI', async (data) => {
  const request = await authorizeAxiosIntance.post(`${API_ROOT}/v1/auth/login`, data);
  return request.data;
});
export const logOutUserAPI = createAsyncThunk('user/logOutUserAPI', async () => {
  const request = await authorizeAxiosIntance.delete(`${API_ROOT}/v1/auth/logout`);
  return request.data;
});
export const updateUserAPI = createAsyncThunk('user/updateUserAPI', async (data) => {
  const response = await authorizeAxiosIntance.put(
    `${API_ROOT}/v1/users/edit/${data.idUser}`,
    data.data
  );
  return response.data;
});
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload;
      state.currentUser = user;
    });
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload;
      state.currentUser = user;
    });
    builder.addCase(logOutUserAPI.fulfilled, (state) => {
      state.currentUser = null;
    });
  }
});

export const selectCurrentUser = (state) => {
  return state.user.currentUser;
};

export const userReducer = userSlice.reducer;
