import FaunaDb from 'faunadb';

import { serverClient } from '../src/utils/fauna-auth';
import { userFixtures } from '../src/library/Fixtures/UserFixtures';
import { tagFixtures } from '../src/library/Fixtures/TagFixtures';
import { imageFixtures } from '../src/library/Fixtures/ImageFixtures';
import { galleryFixtures } from '../src/library/Fixtures/GalleryFixtures';
import { postFixtures } from '../src/library/Fixtures/BlogFixtures';

const q = FaunaDb.query;

/** Tear down collections */
const tearDownCollections = async () => {
  const collections = [
    q.Collection('User'),
    q.Collection('Tag'),
    q.Collection('Image'),
    q.Collection('image_tags'),
    q.Collection('Gallery'),
    q.Collection('gallery_images'),
    q.Collection('gallery_tags'),
    q.Collection('Post'),
    q.Collection('post_images'),
    q.Collection('post_tags'),
  ];

  await serverClient.query(
    q.Do(
      collections.map((collection) =>
        q.If(q.IsCollection(collection), q.Delete(collection), null)
      )
    )
  );
};

/** Collections */
const setupCollections = async () => {
  await serverClient.query(
    q.Do(
      q.CreateCollection({ name: 'User' }),
      q.CreateCollection({ name: 'Tag' }),
      q.CreateCollection({ name: 'Image' }),
      q.CreateCollection({ name: 'image_tags' }),
      q.CreateCollection({ name: 'Gallery' }),
      q.CreateCollection({ name: 'gallery_images' }),
      q.CreateCollection({ name: 'gallery_tags' }),
      q.CreateCollection({ name: 'Post' }),
      q.CreateCollection({ name: 'post_images' }),
      q.CreateCollection({ name: 'post_tags' })
    )
  );
};

/** Indexes */
const setupIndexes = async () => {
  await serverClient.query(
    q.Do(
      // Users
      q.CreateIndex({
        name: 'all_users',
        source: q.Collection('User'),
      }),
      q.CreateIndex({
        name: 'users_by_email',
        permissions: { read: 'public' },
        source: q.Collection('User'),
        terms: [{ field: ['data', 'email'] }],
        unique: true,
      }),

      // Tags
      q.CreateIndex({
        name: 'all_tags',
        source: q.Collection('Tag'),
      }),
      q.CreateIndex({
        name: 'tags_by_slug',
        source: q.Collection('Tag'),
        terms: [{ field: ['data', 'slug'] }],
        unique: true,
      }),

      // Images
      q.CreateIndex({
        name: 'all_images',
        source: q.Collection('Image'),
      }),
      q.CreateIndex({
        name: 'images_by_slug',
        source: q.Collection('Image'),
        terms: [{ field: ['data', 'slug'] }],
        unique: true,
      }),
      q.CreateIndex({
        name: 'images_by_tag',
        source: q.Collection('image_tags'),
        terms: [{ field: ['data', 'image'] }],
        values: [{ field: ['data', 'tag'] }],
      }),

      // Image Tags
      q.CreateIndex({
        name: 'tags_by_image',
        source: q.Collection('image_tags'),
        terms: [{ field: ['data', 'image'] }],
        values: [{ field: ['data', 'tag'] }],
      }),

      // Galleries
      q.CreateIndex({
        name: 'all_galleries',
        source: q.Collection('Gallery'),
      }),
      q.CreateIndex({
        name: 'galleries_by_slug',
        source: q.Collection('Gallery'),
        terms: [{ field: ['data', 'slug'] }],
        unique: true,
      }),
      q.CreateIndex({
        name: 'galleries_by_status',
        source: q.Collection('Gallery'),
        terms: [{ field: ['data', 'status'] }],
        values: [
          { field: ['data', 'datePublished'], reverse: true },
          { field: ['data', 'slug'] },
          { field: ['ref'] },
        ],
      }),

      // Gallery Tags
      q.CreateIndex({
        name: 'tags_by_gallery',
        source: q.Collection('gallery_tags'),
        terms: [{ field: ['data', 'gallery'] }],
        values: [{ field: ['data', 'tag'] }],
      }),

      // Gallery Images
      q.CreateIndex({
        name: 'images_by_gallery',
        source: q.Collection('gallery_images'),
        terms: [{ field: ['data', 'gallery'] }],
        values: [{ field: ['data', 'image'] }],
      }),

      // Posts
      q.CreateIndex({
        name: 'all_posts',
        source: q.Collection('Post'),
      }),
      q.CreateIndex({
        name: 'posts_by_slug',
        source: q.Collection('Post'),
        terms: [{ field: ['data', 'slug'] }],
        unique: true,
      }),
      q.CreateIndex({
        name: 'posts_by_status',
        source: q.Collection('Post'),
        terms: [{ field: ['data', 'status'] }],
        values: [
          { field: ['data', 'datePublished'], reverse: true },
          { field: ['data', 'slug'] },
          { field: ['ref'] },
        ],
      }),

      // Post Tags
      q.CreateIndex({
        name: 'tags_by_post',
        source: q.Collection('post_tags'),
        terms: [{ field: ['data', 'post'] }],
        values: [{ field: ['data', 'tag'] }],
      }),

      // Post Images
      q.CreateIndex({
        name: 'images_by_post',
        source: q.Collection('post_images'),
        terms: [{ field: ['data', 'post'] }],
        values: [{ field: ['data', 'image'] }],
      })
    )
  );
};

/** Fixtures */
const setupFixtures = async () => {
  await serverClient.query(
    q.Let(
      {
        // Users
        users: userFixtures.map((user) => {
          const { id, password, ...data } = user;

          return q.Create(q.Collection('User'), {
            credentials: { password },
            data,
          });
        }),

        // Tags
        tags: tagFixtures.map((tag) =>
          q.Create(q.Collection('Tag'), {
            data: tag,
          })
        ),

        // Images
        images: imageFixtures.map(({ tags, ...image }) =>
          q.Let(
            {
              image: q.Create(q.Collection('Image'), {
                data: image,
              }),
            },
            q.Do(
              ...tags.map((tag) =>
                q.Create(q.Collection('image_tags'), {
                  data: {
                    image: q.Select('ref', q.Var('image')),
                    tag: q.Select(
                      [0, 'ref'],
                      q.Filter(
                        q.Var('tags'),
                        q.Lambda(
                          'tag',
                          q.Equals(
                            q.Select(['data', 'slug'], q.Var('tag')),
                            tag.slug
                          )
                        )
                      )
                    ),
                  },
                })
              ),
              q.Var('image')
            )
          )
        ),
      },
      q.Do(
        // Galleries
        ...galleryFixtures.map(
          ({ images, tags, ...gallery }) =>
            q.Let(
              {
                gallery: q.Create(q.Collection('Gallery'), {
                  data: gallery,
                }),
              },
              q.Do(
                ...tags.map((tag) =>
                  q.Create(q.Collection('gallery_tags'), {
                    data: {
                      gallery: q.Select('ref', q.Var('gallery')),
                      tag: q.Select(
                        [0, 'ref'],
                        q.Filter(
                          q.Var('tags'),
                          q.Lambda(
                            'tag',
                            q.Equals(
                              q.Select(['data', 'slug'], q.Var('tag')),
                              tag.slug
                            )
                          )
                        )
                      ),
                    },
                  })
                ),
                ...images.map((image) =>
                  q.Create(q.Collection('gallery_images'), {
                    data: {
                      gallery: q.Select('ref', q.Var('gallery')),
                      image: q.Select(
                        [0, 'ref'],
                        q.Filter(
                          q.Var('images'),
                          q.Lambda(
                            'image',
                            q.Equals(
                              q.Select(['data', 'slug'], q.Var('image')),
                              image.slug
                            )
                          )
                        )
                      ),
                    },
                  })
                )
              )
            ),

          // Posts
          ...postFixtures.map(({ images, tags, ...post }) =>
            q.Let(
              {
                post: q.Create(q.Collection('Post'), {
                  data: post,
                }),
              },
              q.Do(
                ...tags.map((tag) =>
                  q.Create(q.Collection('post_tags'), {
                    data: {
                      post: q.Select('ref', q.Var('post')),
                      tag: q.Select(
                        [0, 'ref'],
                        q.Filter(
                          q.Var('tags'),
                          q.Lambda(
                            'tag',
                            q.Equals(
                              q.Select(['data', 'slug'], q.Var('tag')),
                              tag.slug
                            )
                          )
                        )
                      ),
                    },
                  })
                ),
                ...images.map((image) =>
                  q.Create(q.Collection('post_images'), {
                    data: {
                      post: q.Select('ref', q.Var('post')),
                      image: q.Select(
                        [0, 'ref'],
                        q.Filter(
                          q.Var('images'),
                          q.Lambda(
                            'image',
                            q.Equals(
                              q.Select(['data', 'slug'], q.Var('image')),
                              image.slug
                            )
                          )
                        )
                      ),
                    },
                  })
                )
              )
            )
          )
        )
      )
    )
  );
};

const wait = (s: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), s * 1000));

const run = async () => {
  await tearDownCollections();
  await wait(30);
  await setupCollections();
  await setupIndexes();
  await wait(10);
  await setupFixtures();
};

run().catch((err) => console.error(err));
