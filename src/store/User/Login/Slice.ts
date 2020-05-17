import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { login, logout } from './Effects';
import { LoginState } from './Types';

export const name = 'login';

const initialState: LoginState = {
  isFetching: false,
  error: null,
};

const loginSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<LoginState>) => ({
      ...state,
      ...action.payload,
    }),
    [login.pending.type]: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    [login.fulfilled.type]: (state) => {
      state.isFetching = false;
    },
    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    [logout.fulfilled.type]: () => initialState,
  },
});

export default loginSlice.reducer;
