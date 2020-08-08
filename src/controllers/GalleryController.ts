import { query as q } from 'faunadb';

import { Status } from '../store/Types';
import { GallerySearchFilters } from '../store/Galleries/Types';
import { serverClient } from '../utils/fauna-auth';
import { DEFAULT_PAGE_SIZE } from '../library/Fixtures/GalleryFixtures';
import { FaunaDbPageResponse, FaunaDbPaginationOptions } from '../types';
import { GalleryData } from './Types';

export const fetchGallerySlugs = async () => {
  const response = await serverClient.query<FaunaDbPageResponse<string>>(
    q.Map(
      q.Paginate(q.Match(q.Index('galleries_by_status'), Status.PUBLISHED)),
      q.Lambda('entity', q.Select([1], q.Var('entity')))
    )
  );

  return response.data;
};

export const fetchGalleries = async (filters: GallerySearchFilters) => {
  const {
    size = DEFAULT_PAGE_SIZE,
    after,
    status = Status.PUBLISHED,
  } = filters;

  const options: FaunaDbPaginationOptions = { size };

  if (after) {
    options.after = [q.Ref(q.Collection('Gallery'), after)];
  }

  const response = await serverClient.query<FaunaDbPageResponse<GalleryData>>(
    q.Map(
      q.Paginate(q.Match(q.Index('galleries_by_status'), status), options),
      q.Lambda(
        'entity',
        q.Let(
          {
            gallery: q.Get(q.Select([2], q.Var('entity'))),
            images: q.Select(
              'data',
              q.Map(
                q.Paginate(
                  q.Match(
                    q.Index('images_by_gallery'),
                    q.Select('ref', q.Var('gallery'))
                  )
                ),
                q.Lambda('ref', q.Select('data', q.Get(q.Var('ref'))))
              )
            ),
            tags: q.Select(
              'data',
              q.Map(
                q.Paginate(
                  q.Match(
                    q.Index('tags_by_gallery'),
                    q.Select('ref', q.Var('gallery'))
                  )
                ),
                q.Lambda('ref', q.Select('data', q.Get(q.Var('ref'))))
              )
            ),
          },
          q.Merge(q.Select('data', q.Var('gallery')), {
            images: q.Var('images'),
            tags: q.Var('tags'),
          })
        )
      )
    )
  );

  return {
    galleries: response.data,
    after: response.after ? response.after[3].id : null ?? null,
  };
};

export const fetchGallery = async (slug: string): Promise<GalleryData> => {
  const gallery = await serverClient.query<GalleryData>(
    q.Let(
      {
        gallery: q.Get(q.Match(q.Index('galleries_by_slug'), slug)),
        images: q.Select(
          'data',
          q.Map(
            q.Paginate(
              q.Match(
                q.Index('images_by_gallery'),
                q.Select('ref', q.Var('gallery'))
              )
            ),
            q.Lambda('ref', q.Select('data', q.Get(q.Var('ref'))))
          )
        ),
        tags: q.Select(
          'data',
          q.Map(
            q.Paginate(
              q.Match(
                q.Index('tags_by_gallery'),
                q.Select('ref', q.Var('gallery'))
              )
            ),
            q.Lambda('ref', q.Select('data', q.Get(q.Var('ref'))))
          )
        ),
      },
      q.Merge(q.Select('data', q.Var('gallery')), {
        images: q.Var('images'),
        tags: q.Var('tags'),
      })
    )
  );

  return gallery;
};
