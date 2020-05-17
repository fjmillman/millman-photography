import { createAsyncThunk } from '@reduxjs/toolkit';
import { CookiesStatic } from 'js-cookie';

import { LoginData } from './Types';
import { APIType } from '../../../library/API';

export const login = createAsyncThunk<
  void,
  LoginData,
  { extra: { api: APIType; cookie: CookiesStatic } }
>('user/login', async (loginData, thunkApi) => {
  const token = await thunkApi.extra.api.getUserAPI().login(loginData);

  thunkApi.extra.cookie.set('token', token, { httpOnly: true });
});

export const logout = createAsyncThunk<
  void,
  void,
  { extra: { cookie: CookiesStatic } }
>('user/logout', (_, thunkApi) => {
  thunkApi.extra.cookie.remove('token');
});
