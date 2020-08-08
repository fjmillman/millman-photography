import { GalleryData } from 'controllers/Types';
import { Status } from '../Types';

export interface GallerySearchFilters {
  size?: number;
  before?: string | null;
  after?: string;
  status?: Status;
}

export interface GalleriesState {
  isFetching: boolean;
  error: string | null;
  isInitialised: boolean;
  galleries: Record<number, GalleryData[]>;
  after: string | null;
  latestPage: number;
  currentPage: number;
}
