/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatISO, subDays } from 'date-fns';

import { PostData } from '../../controllers/Types';
import { PostSearchFilters } from '../../store/Blog/Types';
import { Status } from '../../store/Types';
import { BlogPage } from '../../types';
import { imageFixtures } from './ImageFixtures';
import { tagFixtures } from './TagFixtures';

export const DEFAULT_PAGE_SIZE = 9;

export const postFixtures: PostData[] = [
  {
    title: 'Draft Post',
    slug: 'draft-post',
    description: 'This is a draft post',
    body: `
      # Draft Post

      This is the body of the draft post
    `,
    status: Status.DRAFT,
    dateCreated: formatISO(new Date()),
    datePublished: null,
    dateUpdated: formatISO(new Date()),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Post 1',
    slug: 'published-post-1',
    description: 'This is a published post',
    body: `
      # Published Post 1
      
      This is the body of the published post
    `,
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 11)),
    datePublished: formatISO(subDays(new Date(), 10)),
    dateUpdated: formatISO(subDays(new Date(), 11)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Post 2',
    slug: 'published-post-2',
    description: 'This is a published post',
    body: `
      # Published Post 2
      
      This is the body of the published post
    `,
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 10)),
    datePublished: formatISO(subDays(new Date(), 9)),
    dateUpdated: formatISO(subDays(new Date(), 10)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Post 3',
    slug: 'published-post-3',
    description: 'This is a published post',
    body: `
      # Published Post 3
      
      This is the body of the published post
    `,
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 9)),
    datePublished: formatISO(subDays(new Date(), 8)),
    dateUpdated: formatISO(subDays(new Date(), 9)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Post 4',
    slug: 'published-post-4',
    description: 'This is a published post',
    body: `
      # Published Post 4
      
      This is the body of the published post
    `,
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 8)),
    datePublished: formatISO(subDays(new Date(), 7)),
    dateUpdated: formatISO(subDays(new Date(), 8)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Post 5',
    slug: 'published-post-5',
    description: 'This is a published post',
    body: `
      # Published Post 5
      
      This is the body of the published post
    `,
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 7)),
    datePublished: formatISO(subDays(new Date(), 6)),
    dateUpdated: formatISO(subDays(new Date(), 7)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Post 6',
    slug: 'published-post-6',
    description: 'This is a published post',
    body: `
      # Published Post 6
      
      This is the body of the published post
    `,
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 6)),
    datePublished: formatISO(subDays(new Date(), 5)),
    dateUpdated: formatISO(subDays(new Date(), 6)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Post 7',
    slug: 'published-post-7',
    description: 'This is a published post',
    body: `
      # Published Post 7
      
      This is the body of the published post
    `,
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 5)),
    datePublished: formatISO(subDays(new Date(), 4)),
    dateUpdated: formatISO(subDays(new Date(), 5)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Post 8',
    slug: 'published-post-8',
    description: 'This is a published post',
    body: `
      # Published Post 8
      
      This is the body of the published post
    `,
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 4)),
    datePublished: formatISO(subDays(new Date(), 3)),
    dateUpdated: formatISO(subDays(new Date(), 4)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Post 9',
    slug: 'published-post-9',
    description: 'This is a published post',
    body: `
      # Published Post 9
      
      This is the body of the published post
    `,
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 3)),
    datePublished: formatISO(subDays(new Date(), 2)),
    dateUpdated: formatISO(subDays(new Date(), 3)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Post 10',
    slug: 'published-post-10',
    description: 'This is a published post',
    body: `
      # Published Post 10
      
      This is the body of the published post
    `,
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 2)),
    datePublished: formatISO(subDays(new Date(), 1)),
    dateUpdated: formatISO(subDays(new Date(), 2)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Archived Post',
    slug: 'archived-post',
    description: 'This is a archived post',
    body: `
      # Archived Post
      
      This is the body of the archived post
    `,
    status: Status.ARCHIVED,
    dateCreated: formatISO(subDays(new Date(), 12)),
    datePublished: formatISO(subDays(new Date(), 11)),
    dateUpdated: formatISO(subDays(new Date(), 12)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
];

const fetchPostSlugs = () => postFixtures.map((post) => post.slug);

const fetchPosts = (filters: PostSearchFilters): BlogPage => {
  const { status, size = DEFAULT_PAGE_SIZE, after } = filters;

  const filteredPosts = postFixtures.filter(
    (post: PostData) => post.status === status
  );

  let start = 0;

  if (after) {
    start = filteredPosts.findIndex((post: PostData) => post.slug === after);
  }

  const end = start + size;

  const next = filteredPosts[end];

  return {
    posts: filteredPosts.slice(start, end),
    after: next ? next.slug : null,
  };
};

const fetchPost = (slug: string) => {
  return postFixtures.find((post) => post.slug === slug);
};

export default {
  fetchPostSlugs,
  fetchPosts,
  fetchPost,
};
