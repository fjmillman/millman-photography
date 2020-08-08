/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIType } from 'library/API';
import { DEFAULT_PAGE_SIZE } from 'library/Fixtures/GalleryFixtures';
import { GalleriesPage } from 'types';
import { GallerySearchFilters } from './Types';
import { Status } from '../Types';

export const fetchGalleries = createAsyncThunk<
  GalleriesPage,
  void,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any;
    extra: { api: APIType };
    rejectValue: string;
  }
>('galleries/fetch', async (_, thunkApi) => {
  const {
    galleries: { after },
  } = thunkApi.getState();

  const filters: GallerySearchFilters = {
    status: Status.PUBLISHED,
    size: DEFAULT_PAGE_SIZE,
  };

  if (after) {
    filters.after = after;
  }

  let response: Response;

  try {
    response = await thunkApi.extra.api.gallery.fetchGalleries(filters);
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }

  if (!response.ok) {
    const error = (await response.json()) as string;
    return thunkApi.rejectWithValue(error);
  }

  return (await response.json()) as GalleriesPage;
});
