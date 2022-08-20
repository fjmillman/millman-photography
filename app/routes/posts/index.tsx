import type { Post, Image, ImageOnPosts, Tag, TagOnPosts } from '@prisma/client';
import { Status } from '@prisma/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useSubmit, useTransition } from '@remix-run/react';

import MiniPreview from '~/components/MiniPreview';
import PageCollection from '~/components/PageCollection';
import PageHeader from '~/components/PageHeader';
import prisma from '~/utils/prisma.server';

export type PostWithTagsAndImages = Post & {
  tags: (TagOnPosts & {
    tag: Tag;
  })[];
  images: (ImageOnPosts & {
    image: Image;
  })[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const page = params.page ? parseInt(params.page) : 1;
  const size = params.size ? parseInt(params.size) : 9;

  const total = await prisma.post.count({
    where: { status: Status.Published },
  });

  const totalPages = total > 0 ? Math.ceil(total / size) : 1;

  if (page > totalPages) {
    return redirect(`/posts?page=${totalPages}`);
  }

  const posts = await prisma.post.findMany({
    include: {
      tags: { include: { tag: true } },
      images: { include: { image: true } },
    },
    where: { status: Status.Published },
    take: size,
    skip: (page - 1) * size,
  });

  return json({ posts, page, size, total });
};

export const meta: MetaFunction = () => ({
  title: 'Posts - Millman Photography',
});

const Posts = () => {
  const {
    posts: serializedPosts,
    page,
    size,
    total,
  } = useLoaderData<{
    posts: PostWithTagsAndImages[];
    page: number;
    size: number;
    total: number;
  }>();

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

  const totalPages = Math.ceil(total / size);

  const submit = useSubmit();
  const { state } = useTransition();

  const onPagination = (page: number) => submit(null, { method: 'get', action: `/posts?page=${page}` });

  return (
    <>
      <PageHeader title="Posts">
        <p>Check out my posts!</p>
      </PageHeader>
      <PageCollection<PostWithTagsAndImages>
        isLoading={state === 'submitting'}
        entities={posts}
        selectKey={(post: PostWithTagsAndImages) => post.slug}
        selectImage={(post: PostWithTagsAndImages) => post.images[0].image}
        renderContent={(post: PostWithTagsAndImages) => (
          <MiniPreview
            title={post.title}
            description={post.description}
            tags={post.tags.map(({ tag }) => tag)}
            linkTo={post.slug}
          />
        )}
        fallback={<p>There are no posts!</p>}
        currentPage={page}
        totalPages={totalPages}
        onPagination={onPagination}
      />
    </>
  );
};

export default Posts;
