import { ParsedUrlQuery } from 'querystring';
import { GallerySearchFilters } from '../store/Galleries/Types';
import { Status } from '../store/Types';

const convertToInt = (value: string) => parseInt(value, 10);

const isStatus = (status: string) =>
  [Status.DRAFT, Status.PUBLISHED, Status.ARCHIVED].includes(status as Status);

const parseGallerySearchFiltersFromQuery = (query: ParsedUrlQuery) => {
  const { status, size, before, after } = query;

  const filters: GallerySearchFilters = {
    status:
      typeof status === 'string' && isStatus(status)
        ? (status as Status)
        : Status.PUBLISHED,
  };

  if (typeof size === 'string') {
    filters.size = convertToInt(size);
  }

  if (typeof before === 'string') {
    filters.before = before === 'null' ? null : before;
  }

  if (typeof after === 'string') {
    filters.after = after;
  }

  return filters;
};

export default parseGallerySearchFiltersFromQuery;
