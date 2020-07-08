/* eslint-disable @typescript-eslint/no-unused-vars */
import { PostData } from '../../controllers/Types';
import { PostSearchFilters } from '../../store/Blog/Types';
import { Status } from '../../store/Types';
import { imageFixtures } from './ImageFixtures';
import { tagFixtures } from './TagFixtures';
import { BlogPage } from '../../types';

export const DEFAULT_PAGE_SIZE = 9;

const posts: PostData[] = [
  {
    title: 'Draft Post',
    slug: 'draft-post',
    description: 'This is a draft post',
    body: `
      # Draft Post

      This is the body of the draft post
    `,
    status: Status.DRAFT,
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
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Archived Post',
    slug: 'archived-post',
    description: 'This is a archived post',
    body: `
      # Archived Post
      
      This is the body of the archibed post
    `,
    status: Status.ARCHIVED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
];

const fetchPostSlugs = () => posts.map((post) => post.slug);

const fetchPosts = (filters: PostSearchFilters): BlogPage => {
  const { status, size = DEFAULT_PAGE_SIZE, after } = filters;

  const filteredPosts = posts.filter(
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
  return posts.find((post) => post.slug === slug);
};

export default {
  fetchPostSlugs,
  fetchPosts,
  fetchPost,
};
