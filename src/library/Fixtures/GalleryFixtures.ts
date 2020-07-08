/* eslint-disable @typescript-eslint/no-unused-vars */
import { GalleryData } from '../../controllers/Types';
import { GallerySearchFilters } from '../../store/Galleries/Types';
import { Status } from '../../store/Types';
import { tagFixtures } from './TagFixtures';
import { imageFixtures } from './ImageFixtures';
import { GalleriesPage } from '../../types';

export const DEFAULT_PAGE_SIZE = 9;

const galleries: GalleryData[] = [
  {
    title: 'Draft Gallery',
    slug: 'draft-gallery',
    description: 'This is a draft gallery',
    status: Status.DRAFT,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 1',
    slug: 'published-gallery-1',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 2',
    slug: 'published-gallery-2',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 3',
    slug: 'published-gallery-3',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 4',
    slug: 'published-gallery-4',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 5',
    slug: 'published-gallery-5',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 6',
    slug: 'published-gallery-6',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 7',
    slug: 'published-gallery-7',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 8',
    slug: 'published-gallery-8',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 9',
    slug: 'published-gallery-9',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 10',
    slug: 'published-gallery-10',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Archived Gallery',
    slug: 'archived-gallery',
    description: 'This is a archived gallery',
    status: Status.ARCHIVED,
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
];

const fetchGallerySlugs = () => galleries.map((gallery) => gallery.slug);

const fetchGalleries = (filters: GallerySearchFilters): GalleriesPage => {
  const { status, size = DEFAULT_PAGE_SIZE, after } = filters;

  const filteredGalleries = galleries.filter(
    (gallery: GalleryData) => gallery.status === status
  );

  let start = 0;

  if (after) {
    start = filteredGalleries.findIndex(
      (gallery: GalleryData) => gallery.slug === after
    );
  }

  const end = start + size;

  const next = filteredGalleries[end];

  return {
    galleries: filteredGalleries.slice(start, end),
    after: next ? next.slug : null,
  };
};

const fetchGallery = (slug: string) => {
  return galleries.find((gallery) => gallery.slug === slug);
};

export default {
  fetchGallerySlugs,
  fetchGalleries,
  fetchGallery,
};
