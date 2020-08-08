import { query as q } from 'faunadb';

import { Status } from 'store/Types';
import { PostSearchFilters } from 'store/Blog/Types';
import { serverClient } from 'utils/fauna-auth';
import { DEFAULT_PAGE_SIZE } from 'library/Fixtures/BlogFixtures';
import { FaunaDbPageResponse, FaunaDbPaginationOptions } from 'types';
import { PostData } from './Types';

export const fetchPostSlugs = async () => {
  const response = await serverClient.query<FaunaDbPageResponse<string>>(
    q.Map(
      q.Paginate(q.Match(q.Index('posts_by_status'), Status.PUBLISHED)),
      q.Lambda('entity', q.Select([1], q.Var('entity')))
    )
  );

  return response.data;
};

export const fetchPosts = async (filters: PostSearchFilters) => {
  const {
    size = DEFAULT_PAGE_SIZE,
    after,
    status = Status.PUBLISHED,
  } = filters;

  const options: FaunaDbPaginationOptions = { size };

  if (after) {
    options.after = [q.Ref(q.Collection('Post'), after)];
  }

  const response = await serverClient.query<FaunaDbPageResponse<PostData>>(
    q.Map(
      q.Paginate(q.Match(q.Index('posts_by_status'), status), options),
      q.Lambda(
        'entity',
        q.Let(
          {
            post: q.Get(q.Select([2], q.Var('entity'))),
            images: q.Select(
              'data',
              q.Map(
                q.Paginate(
                  q.Match(
                    q.Index('images_by_post'),
                    q.Select('ref', q.Var('post'))
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
                    q.Index('tags_by_post'),
                    q.Select('ref', q.Var('post'))
                  )
                ),
                q.Lambda('ref', q.Select('data', q.Get(q.Var('ref'))))
              )
            ),
          },
          q.Merge(q.Select('data', q.Var('post')), {
            images: q.Var('images'),
            tags: q.Var('tags'),
          })
        )
      )
    )
  );

  return {
    posts: response.data,
    after: response.after ? (response.after as any)[3].id : null ?? null,
  };
};

export const fetchPost = async (slug: string): Promise<PostData> => {
  const post = await serverClient.query<PostData>(
    q.Let(
      {
        post: q.Get(q.Match(q.Index('posts_by_slug'), slug)),
        images: q.Select(
          'data',
          q.Map(
            q.Paginate(
              q.Match(q.Index('images_by_post'), q.Select('ref', q.Var('post')))
            ),
            q.Lambda('ref', q.Select('data', q.Get(q.Var('ref'))))
          )
        ),
        tags: q.Select(
          'data',
          q.Map(
            q.Paginate(
              q.Match(q.Index('tags_by_post'), q.Select('ref', q.Var('post')))
            ),
            q.Lambda('ref', q.Select('data', q.Get(q.Var('ref'))))
          )
        ),
      },
      q.Merge(q.Select('data', q.Var('post')), {
        images: q.Var('images'),
        tags: q.Var('tags'),
      })
    )
  );

  return post;
};
