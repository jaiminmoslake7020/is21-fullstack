import {createSlice} from '@reduxjs/toolkit';
import {UserSlice} from '../../types/reducers';

const initialState = {
  user: null,
} as UserSlice;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state:UserSlice, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload
    },
    logout: (state:UserSlice, action) => {
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
