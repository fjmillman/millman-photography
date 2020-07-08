import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { login, logout, check } from './Effects';
import { LoginState } from './Types';

export const name = 'login';

const initialState: LoginState = {
  isFetching: false,
  error: null,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state: LoginState, action: PayloadAction<any>) => {
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
      };
    },
    [login.pending.type]: (state: LoginState) => {
      state.isFetching = true;
      state.error = null;
      state.isLoggedIn = false;
    },
    [login.fulfilled.type]: (state: LoginState) => {
      state.isFetching = false;
      state.isLoggedIn = true;
    },
    [login.rejected.type]: (
      state: LoginState,
      action: PayloadAction<string>
    ) => {
      state.isFetching = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    [check.fulfilled.type]: (state: LoginState) => {
      state.isLoggedIn = true;
    },
    [check.rejected.type]: (state: LoginState) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled.type]: () => initialState,
  },
});

export default loginSlice.reducer;
