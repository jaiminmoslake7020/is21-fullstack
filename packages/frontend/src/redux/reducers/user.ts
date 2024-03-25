import {createSlice} from '@reduxjs/toolkit';
import {UserSlice} from '../../types/reducers';

const userLocal = localStorage.getItem('user');
const initialState = {
  user: userLocal ? JSON.parse(userLocal) : null,
} as UserSlice;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state:UserSlice, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state:UserSlice) => {
      localStorage.removeItem('user');
      // eslint-disable-next-line no-param-reassign
      state.user = null;
    },
  },
});

export const { actions, reducer } = userSlice;

export const {
  login, logout
} = actions;

export default reducer;
