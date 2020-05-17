import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import cookie from 'js-cookie';

import api from '../library/API';
import rootReducer, { RootState } from './Reducer';

const makeStore: MakeStore<RootState> = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      thunk: {
        extraArgument: { api, cookie },
      },
    }),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export const useThunkDispatch = () => useDispatch<AppDispatch>();

export default createWrapper<RootState>(makeStore, { debug: true });
