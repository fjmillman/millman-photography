import { Status } from '@prisma/client';
import type { LoaderFunction, MetaFunction, RouteComponent } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import LinkButton from '~/components/Buttons/LinkButton';
import PageHeader from '~/components/PageHeader';
import PostPreview from '~/components/PostPreview';
import RowCollection from '~/components/RowCollection';
import prisma from '~/utils/prisma.server';

import type { PostWithTagsAndImages } from './posts';

export const loader: LoaderFunction = async () => {
  const posts: PostWithTagsAndImages[] = await prisma.post.findMany({
    where: { status: Status.Published },
    include: {
      tags: { include: { tag: true } },
      images: { include: { image: true } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return json(posts);
};

export const meta: MetaFunction = () => ({
  title: 'Blog - Millman Photography',
});

const Blog: RouteComponent = () => {
  const serializedPosts = useLoaderData<PostWithTagsAndImages[]>();

  const posts = serializedPosts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    tags: post.tags.map((tag) => ({
      ...tag,
      tag: {
        ...tag.tag,
        createdAt: new Date(tag.tag.createdAt),
        updatedAt: new Date(tag.tag.updatedAt),
      },
    })),
    images: post.images.map((image) => ({
      ...image,
      image: {
        ...image.image,
        createdAt: new Date(image.image.createdAt),
        updatedAt: new Date(image.image.updatedAt),
      },
    })),
  }));

  return (
    <>
      <PageHeader title="Blog">
        <p>Welcome to my blog!</p>
      </PageHeader>
      <RowCollection<PostWithTagsAndImages>
        entities={posts}
        selectKey={(post: PostWithTagsAndImages) => post.slug}
        selectImage={(post: PostWithTagsAndImages) => post.images[0].image}
        renderContent={({ title, description, tags, slug }: PostWithTagsAndImages) => (
          <PostPreview title={title} description={description} tags={tags.map(({ tag }) => tag)} slug={slug} />
        )}
      />
      <div className="flex w-full justify-around mt-8">
        <Link to="/posts">
          <LinkButton>Check out all of my posts</LinkButton>
        </Link>
      </div>
    </>
  );
};

export default Blog;
