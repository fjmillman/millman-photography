import { ImageData, Tag } from '../../controllers/Types';
import { promiseWrap } from '../utils';
import { tagFixtures } from './TagFixtures';
import { ImageSearchFilters } from '../../store/Types';

const url =
  'https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/97805242_3172504982973692_6555087608093868032_o.jpg?_nc_cat=108&_nc_sid=2d5d41&_nc_oc=AQnXcycDP2Zv2lO3mve4_kzN_KscH3z9quACoZPbM7pVE3AZOELR1HORdd4ifAik1kfYdCMnwCTz2A10uuQ2XW8J&_nc_ht=scontent-frx5-1.xx&oh=56b405bd312b554923736aa6bf73f74e&oe=5F181921';

export const imageFixtures: ImageData[] = [
  {
    slug: 'image-1',
    caption: 'Image 1',
    url,
    tags: [tagFixtures[0]],
  },
  {
    slug: 'image-2',
    caption: 'Image 2',
    url,
    tags: [tagFixtures[1]],
  },
  {
    slug: 'image-3',
    caption: 'Image 3',
    url,
    tags: [tagFixtures[2]],
  },
  {
    slug: 'image-4',
    caption: 'Image 4',
    url,
    tags: [tagFixtures[0]],
  },
  {
    slug: 'image-5',
    caption: 'Image 5',
    url,
    tags: [tagFixtures[1]],
  },
  {
    slug: 'image-6',
    caption: 'Image 6',
    url,
    tags: [tagFixtures[2]],
  },
  {
    slug: 'image-7',
    caption: 'Image 7',
    url,
    tags: [tagFixtures[0]],
  },
  {
    slug: 'image-8',
    caption: 'Image 8',
    url,
    tags: [tagFixtures[1]],
  },
  {
    slug: 'image-9',
    caption: 'Image 9',
    url,
    tags: [tagFixtures[2]],
  },
];

const fetchImageSlugs = () =>
  promiseWrap(imageFixtures.map((image: ImageData) => image.slug));

const fetchTotalImages = (filters: ImageSearchFilters) =>
  promiseWrap(
    imageFixtures.filter((image: ImageData) =>
      filters.tags
        ? image.tags.filter((tag: Tag) => filters.tags.includes(tag.slug))
            .length > 0
        : true
    ).length
  );

const fetchImages = (filters: ImageSearchFilters) =>
  promiseWrap(
    imageFixtures.filter((image: ImageData) =>
      filters.tags
        ? image.tags.filter((tag: Tag) => filters.tags.includes(tag.slug))
            .length > 0
        : true
    )
  );

const fetchImage = (slug: string) => {
  return promiseWrap(
    imageFixtures.find((image: ImageData) => image.slug === slug)
  );
};

export default {
  fetchImageSlugs,
  fetchTotalImages,
  fetchImages,
  fetchImage,
};
