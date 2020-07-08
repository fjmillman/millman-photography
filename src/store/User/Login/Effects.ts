/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';

import { LoginData } from './Types';
import { APIType } from '../../../library/API';

export const login = createAsyncThunk<
  void,
  LoginData,
  {
    extra: { api: APIType };
    rejectValue: string;
  }
>('user/login', async (loginData, thunkApi) => {
  sessionStorage.setItem('isLoggedIn', 'false');

  let response: Response;

  try {
    response = await thunkApi.extra.api.user.login(loginData);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }

  if (!response.ok) {
    const data = (await response.json()) as { error: string };
    return thunkApi.rejectWithValue(data.error);
  }

  sessionStorage.setItem('isLoggedIn', 'true');
  Router.push('/');
});

export const check = createAsyncThunk<
  void,
  void,
  {
    extra: { api: APIType };
    rejectValue: string;
  }
>('user/check', async (_, thunkApi) => {
  if (sessionStorage.getItem('isLoggedIn')) {
    return;
  }

  const response = await thunkApi.extra.api.user.check();

  if (!response.ok) {
    sessionStorage.setItem('isLoggedIn', 'false');
    throw new Error('User is not logged in');
  }

  sessionStorage.setItem('isLoggedIn', 'true');
});

export const logout = createAsyncThunk<
  void,
  void,
  {
    extra: { api: APIType };
    rejectValue: string;
  }
>('user/logout', async (_, thunkApi) => {
  if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    sessionStorage.setItem('isLoggedIn', 'false');
    Router.push('/');
  }

  let response: Response;

  try {
    response = await thunkApi.extra.api.user.logout();
  } catch (err) {
    sessionStorage.setItem('isLoggedIn', 'false');
    return thunkApi.rejectWithValue(err.message);
  }

  if (!response.ok) {
    const error = 'There was an issue trying to log you out.';
    sessionStorage.setItem('isLoggedIn', 'false');
    return thunkApi.rejectWithValue(error);
  }

  sessionStorage.setItem('isLoggedIn', 'false');
  Router.push('/');
});
