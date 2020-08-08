import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { BlogPage } from 'types';
import { BlogState } from './Types';
import { fetchPosts } from './Effects';

export const name = 'blog';

const initialState: BlogState = {
  isFetching: false,
  error: null,
  isInitialised: false,
  posts: {},
  after: null,
  latestPage: 0,
  currentPage: 0,
};

const blogSlice = createSlice({
  name,
  initialState,
  reducers: {
    initialisePosts: (state: BlogState, action: PayloadAction<BlogPage>) => {
      const { posts, after } = action.payload;

      state.currentPage = 1;
      state.latestPage = 1;
      state.posts[state.latestPage] = posts;
      state.after = after;
      state.isInitialised = true;
    },
    setCurrentPage: (state: BlogState, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state: BlogState, action: PayloadAction<never>) => {
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
      };
    },
    [fetchPosts.pending.type]: (state: BlogState) => {
      state.isFetching = true;
      state.error = null;
    },
    [fetchPosts.fulfilled.type]: (
      state: BlogState,
      action: PayloadAction<BlogPage>
    ) => {
      const { posts, after } = action.payload;

      state.isFetching = false;
      state.latestPage += 1;
      state.currentPage = state.latestPage;
      state.posts[state.latestPage] = posts;
      state.after = after;
    },
    [fetchPosts.rejected.type]: (
      state: BlogState,
      action: PayloadAction<void, string, never, string>
    ) => {
      state.isFetching = false;
      state.error = action.error;
    },
  },
});

export const { initialisePosts, setCurrentPage } = blogSlice.actions;

export default blogSlice.reducer;
