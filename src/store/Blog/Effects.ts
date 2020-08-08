/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIType } from 'library/API';
import { DEFAULT_PAGE_SIZE } from 'library/Fixtures/BlogFixtures';
import { BlogPage } from 'types';
import { PostSearchFilters } from './Types';
import { Status } from '../Types';

export const fetchPosts = createAsyncThunk<
  BlogPage,
  void,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any;
    extra: { api: APIType };
    rejectValue: string;
  }
>('blog/posts/fetch', async (_, thunkApi) => {
  const {
    blog: { after },
  } = thunkApi.getState();

  const filters: PostSearchFilters = {
    status: Status.PUBLISHED,
    size: DEFAULT_PAGE_SIZE,
  };

  if (after) {
    filters.after = after;
  }

  let response: Response;

  try {
    response = await thunkApi.extra.api.blog.fetchPosts(filters);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }

  if (!response.ok) {
    const error = (await response.json()) as string;
    return thunkApi.rejectWithValue(error);
  }

  return (await response.json()) as BlogPage;
});
