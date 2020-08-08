import { Expr } from 'faunadb';

import { PostData, GalleryData } from 'controllers/Types';

export interface Pagination {
  before: string | null;
  after: string | null;
}

export interface FaunaDbPaginationOptions {
  size?: number;
  before?: Expr[] | null;
  after?: Expr[];
}

export interface FaunaDbRawData<T> {
  ref: {
    id: string;
  };
  data: T;
}

export interface FaunaDbPageResponse<T> {
  data: T[];
  before?: {
    id: string;
  };
  after?: {
    id: string;
  };
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
