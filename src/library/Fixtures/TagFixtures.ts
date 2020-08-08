import { Tag } from 'controllers/Types';
import { promiseWrap } from '../utils';

export const tagFixtures: Tag[] = [
  {
    slug: 'tag-1',
    name: 'Tag 1',
  },
  {
    slug: 'tag-2',
    name: 'Tag 2',
  },
  {
    slug: 'tag-3',
    name: 'Tag 3',
  },
];

const fetchTagSlugs = () =>
  promiseWrap(tagFixtures.map((tag: Tag) => tag.slug));

const fetchTotalTags = (search: string | undefined) =>
  promiseWrap(
    tagFixtures.filter((tag: Tag) => !search || tag.name.includes(search))
      .length
  );

const fetchTags = (search: string) =>
  promiseWrap(
    tagFixtures.filter((tag: Tag) => !search || tag.name.includes(search))
  );

const fetchTag = (slug: string) => {
  return promiseWrap(tagFixtures.find((tag: Tag) => tag.slug === slug));
};

export default {
  fetchTagSlugs,
  fetchTotalTags,
  fetchTags,
  fetchTag,
};
