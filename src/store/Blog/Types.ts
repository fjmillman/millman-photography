import { PostData } from 'controllers/Types';
import { Status } from '../Types';

export interface PostSearchFilters {
  size?: number;
  before?: string | null;
  after?: string;
  status?: Status;
}

export interface BlogState {
  isFetching: boolean;
  error: string | null;
  isInitialised: boolean;
  posts: Record<number, PostData[]>;
  after: string | null;
  latestPage: number;
  currentPage: number;
}
