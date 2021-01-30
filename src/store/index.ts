import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch, createSelectorHook } from 'react-redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';

import api from 'library/API';
import rootReducer from './Reducer';

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
    }),
    devTools: true,
  });

export type AppStore = ReturnType<typeof createStore>;

export type RootState = ReturnType<AppStore['getState']>;
export const useTypedSelector = createSelectorHook<RootState>();

export type AppDispatch = AppStore['dispatch'];
export const useThunkDispatch = () => useDispatch<AppDispatch>();

const makeStore: MakeStore<RootState> = createStore;

export default createWrapper(makeStore);
