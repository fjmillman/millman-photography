import { query as q } from 'faunadb';

import { Status } from '../store/Types';
import { GallerySearchFilters } from '../store/Galleries/Types';
import { serverClient } from '../utils/fauna-auth';
import { DEFAULT_PAGE_SIZE } from '../library/Fixtures/GalleryFixtures';
import { FaunaDbPageResponse, FaunaDbPaginationOptions } from '../types';
import { Gallery, Image, Tag, GalleryData } from './Types';

export const fetchGallerySlugs = async () => {
  const options: FaunaDbPaginationOptions = {};
  let rawGalleries: FaunaDbPageResponse<Gallery>;
  const gallerySlugs: string[] = [];

  do {
    // eslint-disable-next-line no-await-in-loop
    rawGalleries = await serverClient.query<FaunaDbPageResponse<Gallery>>(
      q.Map(
        q.Paginate(
          q.Match(q.Index('galleries_by_status'), Status.PUBLISHED),
          options
        ),
        (ref) => q.Get(ref)
      )
    );

    if (rawGalleries.data.length > 0) {
      gallerySlugs.push(...rawGalleries.data.map((entity) => entity.data.slug));
    }

    if (rawGalleries.after) {
      options.after = [
        q.Get(q.Match(q.Index('all_galleries'), rawGalleries.after)),
      ];
    }
  } while (rawGalleries.after);

  return gallerySlugs;
};

export const fetchGalleries = async (filters: GallerySearchFilters) => {
  const {
    size = DEFAULT_PAGE_SIZE,
    after,
    status = Status.PUBLISHED,
  } = filters;

  const options: FaunaDbPaginationOptions = { size };

  if (after) {
    options.after = [q.Get(q.Match(q.Index('all_galleries')), after)];
  }

  const rawGalleries = await serverClient.query<FaunaDbPageResponse<Gallery>>(
    q.Map(
      q.Paginate(q.Match(q.Index('galleries_by_status'), status), options),
      (ref) => q.Get(ref)
    )
  );

  const galleries: GalleryData[] = await Promise.all(
    rawGalleries.data.map(async (rawGallery) => {
      const rawImages = await serverClient.query<FaunaDbPageResponse<Image>>(
        q.Map(
          q.Paginate(q.Match(q.Index('images_by_gallery'), rawGallery.ref)),
          (ref) => q.Get(ref)
        )
      );

      const rawTags = await serverClient.query<FaunaDbPageResponse<Tag>>(
        q.Map(
          q.Paginate(q.Match(q.Index('tags_by_gallery'), rawGallery.ref)),
          (ref) => q.Get(ref)
        )
      );

      return {
        ...rawGallery.data,
        images: rawImages.data.map((rawImage) => rawImage.data),
        tags: rawTags.data.map((rawTag) => rawTag.data),
      };
    })
  );

  return { galleries, after: rawGalleries.after ?? null };
};

export const fetchGallery = async (slug: string): Promise<GalleryData> => {
  const rawGalleries = await serverClient.query<FaunaDbPageResponse<Gallery>>(
    q.Map(q.Paginate(q.Match(q.Index('galleries_by_slug'), slug)), (ref) =>
      q.Get(ref)
    )
  );

  const rawGallery = rawGalleries.data[0];

  const rawImages = await serverClient.query<FaunaDbPageResponse<Image>>(
    q.Map(
      q.Paginate(q.Match(q.Index('images_by_gallery'), rawGallery.ref)),
      (ref) => q.Get(ref)
    )
  );

  const rawTags = await serverClient.query<FaunaDbPageResponse<Tag>>(
    q.Map(
      q.Paginate(q.Match(q.Index('tags_by_gallery'), rawGallery.ref)),
      (ref) => q.Get(ref)
    )
  );

  return {
    ...rawGallery.data,
    images: rawImages.data.map((rawImage) => rawImage.data),
    tags: rawTags.data.map((rawTag) => rawTag.data),
  };
};
