import { query as q } from 'faunadb';

import { Status } from '../store/Types';
import { PostSearchFilters } from '../store/Blog/Types';
import { serverClient } from '../utils/fauna-auth';
import { DEFAULT_PAGE_SIZE } from '../library/Fixtures/BlogFixtures';
import { FaunaDbPageResponse, FaunaDbPaginationOptions } from '../types';
import { Post, Image, Tag, PostData } from './Types';

export const fetchPostSlugs = async () => {
  const options: FaunaDbPaginationOptions = {};
  let rawPosts: FaunaDbPageResponse<Post>;
  const postSlugs: string[] = [];

  do {
    // eslint-disable-next-line no-await-in-loop
    rawPosts = await serverClient.query<FaunaDbPageResponse<Post>>(
      q.Map(
        q.Paginate(
          q.Match(q.Index('posts_by_status'), Status.PUBLISHED),
          options
        ),
        (ref) => q.Get(ref)
      )
    );

    if (rawPosts.data.length > 0) {
      postSlugs.push(...rawPosts.data.map((entity) => entity.data.slug));
    }

    if (rawPosts.after) {
      options.after = [q.Get(q.Match(q.Index('all_posts'), rawPosts.after))];
    }
  } while (rawPosts.after);

  return postSlugs;
};

export const fetchPosts = async (filters: PostSearchFilters) => {
  const {
    size = DEFAULT_PAGE_SIZE,
    after,
    status = Status.PUBLISHED,
  } = filters;

  const options: FaunaDbPaginationOptions = { size };

  if (after) {
    options.after = [q.Get(q.Match(q.Index('all_posts'), after))];
  }

  const rawPosts = await serverClient.query<FaunaDbPageResponse<Post>>(
    q.Map(
      q.Paginate(q.Match(q.Index('posts_by_status'), status), options),
      (ref) => q.Get(ref)
    )
  );

  const posts: PostData[] = await Promise.all(
    rawPosts.data.map(async (rawPost) => {
      const rawImages = await serverClient.query<FaunaDbPageResponse<Image>>(
        q.Map(
          q.Paginate(q.Match(q.Index('images_by_post'), rawPost.ref)),
          (ref) => q.Get(ref)
        )
      );

      const rawTags = await serverClient.query<FaunaDbPageResponse<Tag>>(
        q.Map(
          q.Paginate(q.Match(q.Index('tags_by_post'), rawPost.ref)),
          (ref) => q.Get(ref)
        )
      );

      return {
        ...rawPost.data,
        images: rawImages.data.map((rawImage) => rawImage.data),
        tags: rawTags.data.map((rawTag) => rawTag.data),
      };
    })
  );

  return { posts, after: rawPosts.after ?? null };
};

export const fetchPost = async (slug: string): Promise<PostData> => {
  const rawPosts = await serverClient.query<FaunaDbPageResponse<Post>>(
    q.Map(q.Paginate(q.Match(q.Index('posts_by_slug'), slug)), (ref) =>
      q.Get(ref)
    )
  );

  const rawPost = rawPosts.data[0];

  const rawImages = await serverClient.query<FaunaDbPageResponse<Image>>(
    q.Map(q.Paginate(q.Match(q.Index('images_by_post'), rawPost.ref)), (ref) =>
      q.Get(ref)
    )
  );

  const rawTags = await serverClient.query<FaunaDbPageResponse<Tag>>(
    q.Map(q.Paginate(q.Match(q.Index('tags_by_post'), rawPost.ref)), (ref) =>
      q.Get(ref)
    )
  );

  return {
    ...rawPost.data,
    images: rawImages.data.map((rawImage) => rawImage.data),
    tags: rawTags.data.map((rawTag) => rawTag.data),
  };
};
