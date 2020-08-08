import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { GalleriesPage } from 'types';
import { GalleriesState } from './Types';
import { fetchGalleries } from './Effects';

export const name = 'galleries';

const initialState: GalleriesState = {
  isFetching: false,
  error: null,
  isInitialised: false,
  galleries: {},
  after: null,
  latestPage: 0,
  currentPage: 0,
};

const galleriesSlice = createSlice({
  name,
  initialState,
  reducers: {
    initialiseGalleries: (
      state: GalleriesState,
      action: PayloadAction<GalleriesPage>
    ) => {
      const { galleries, after } = action.payload;

      state.latestPage = 1;
      state.galleries[state.latestPage] = galleries;
      state.after = after;
      state.isInitialised = true;
      state.currentPage = 1;
    },
    setCurrentPage: (state: GalleriesState, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state: GalleriesState, action: PayloadAction<never>) => {
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
      };
    },
    [fetchGalleries.pending.type]: (state: GalleriesState) => {
      state.isFetching = true;
      state.error = null;
    },
    [fetchGalleries.fulfilled.type]: (
      state: GalleriesState,
      action: PayloadAction<GalleriesPage>
    ) => {
      const { galleries, after } = action.payload;

      state.isFetching = false;
      state.latestPage += 1;
      state.galleries[state.latestPage] = galleries;
      state.after = after;
      state.currentPage = state.latestPage;
    },
    [fetchGalleries.rejected.type]: (
      state: GalleriesState,
      action: PayloadAction<void, string, never, string>
    ) => {
      state.isFetching = false;
      state.error = action.error;
    },
  },
});

export const { initialiseGalleries, setCurrentPage } = galleriesSlice.actions;

export default galleriesSlice.reducer;
