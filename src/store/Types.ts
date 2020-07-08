export enum Status {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export interface TagData {
  name: string;
}

export interface ImageData {
  caption: string;
  url: string;
  tags: TagData[];
}

export interface ImageSearchFilters {
  search: string;
  tags: string[];
}
