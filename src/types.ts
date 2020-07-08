import { Expr } from 'faunadb';

import { PostData, GalleryData } from './controllers/Types';

export interface Pagination {
  before: string | null;
  after: string | null;
}

export interface FaunaDbPaginationOptions {
  size?: number;
  before?: Expr[] | null;
  after?: Expr[];
}

export interface FaunaDbPageResponse<T> {
  data: {
    ref: string;
    data: T;
  }[];
  before?: string;
  after?: string;
}

export interface BlogPage {
  posts: PostData[];
  after: string | null;
}

export interface GalleriesPage {
  galleries: GalleryData[];
  after: string | null;
}

export interface MdxSource {
  source: string;
  renderedOutput: string;
}
