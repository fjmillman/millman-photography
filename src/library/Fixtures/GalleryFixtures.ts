/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatISO, subDays } from 'date-fns';

import { GalleryData } from 'controllers/Types';
import { GallerySearchFilters } from 'store/Galleries/Types';
import { Status } from 'store/Types';
import { GalleriesPage } from 'types';
import { tagFixtures } from './TagFixtures';
import { imageFixtures } from './ImageFixtures';

export const DEFAULT_PAGE_SIZE = 9;

export const galleryFixtures: GalleryData[] = [
  {
    title: 'Draft Gallery',
    slug: 'draft-gallery',
    description: 'This is a draft gallery',
    status: Status.DRAFT,
    dateCreated: formatISO(new Date()),
    datePublished: null,
    dateUpdated: formatISO(new Date()),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 1',
    slug: 'published-gallery-1',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 11)),
    datePublished: formatISO(subDays(new Date(), 10)),
    dateUpdated: formatISO(subDays(new Date(), 11)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 2',
    slug: 'published-gallery-2',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 10)),
    datePublished: formatISO(subDays(new Date(), 9)),
    dateUpdated: formatISO(subDays(new Date(), 10)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 3',
    slug: 'published-gallery-3',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 9)),
    datePublished: formatISO(subDays(new Date(), 8)),
    dateUpdated: formatISO(subDays(new Date(), 9)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 4',
    slug: 'published-gallery-4',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 8)),
    datePublished: formatISO(subDays(new Date(), 7)),
    dateUpdated: formatISO(subDays(new Date(), 8)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 5',
    slug: 'published-gallery-5',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 7)),
    datePublished: formatISO(subDays(new Date(), 6)),
    dateUpdated: formatISO(subDays(new Date(), 7)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 6',
    slug: 'published-gallery-6',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 6)),
    datePublished: formatISO(subDays(new Date(), 5)),
    dateUpdated: formatISO(subDays(new Date(), 6)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 7',
    slug: 'published-gallery-7',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 5)),
    datePublished: formatISO(subDays(new Date(), 4)),
    dateUpdated: formatISO(subDays(new Date(), 5)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 8',
    slug: 'published-gallery-8',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 4)),
    datePublished: formatISO(subDays(new Date(), 3)),
    dateUpdated: formatISO(subDays(new Date(), 4)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 9',
    slug: 'published-gallery-9',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 3)),
    datePublished: formatISO(subDays(new Date(), 2)),
    dateUpdated: formatISO(subDays(new Date(), 3)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Published Gallery 10',
    slug: 'published-gallery-10',
    description: 'This is a published gallery',
    status: Status.PUBLISHED,
    dateCreated: formatISO(subDays(new Date(), 2)),
    datePublished: formatISO(subDays(new Date(), 1)),
    dateUpdated: formatISO(subDays(new Date(), 2)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
  {
    title: 'Archived Gallery',
    slug: 'archived-gallery',
    description: 'This is a archived gallery',
    status: Status.ARCHIVED,
    dateCreated: formatISO(subDays(new Date(), 12)),
    datePublished: formatISO(subDays(new Date(), 11)),
    dateUpdated: formatISO(subDays(new Date(), 12)),
    images: [imageFixtures[0]].map(({ tags, ...image }) => image),
    tags: [tagFixtures[0]],
  },
];

const fetchGallerySlugs = () => galleryFixtures.map((gallery) => gallery.slug);

const fetchGalleries = (filters: GallerySearchFilters): GalleriesPage => {
  const { status, size = DEFAULT_PAGE_SIZE, after } = filters;

  const filteredGalleries = galleryFixtures.filter(
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
  return galleryFixtures.find((gallery) => gallery.slug === slug);
};

export default {
  fetchGallerySlugs,
  fetchGalleries,
  fetchGallery,
};
