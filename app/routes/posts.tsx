import { redirect, useFetcher } from 'react-router';

import MiniPreview from '~/components/MiniPreview';
import PageCollection from '~/components/PageCollection';
import PageHeader from '~/components/PageHeader';
import { Status } from '~/prisma/generated';
import type { Post, Image, ImageOnPosts, Tag, TagOnPosts } from '~/prisma/generated';
import prisma from '~/utils/prisma.server';

import type { Route } from './+types/posts';

export type PostWithTagsAndImages = Post & {
  tags: (TagOnPosts & {
    tag: Tag;
  })[];
  images: (ImageOnPosts & {
    image: Image;
  })[];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const page = params.page ? parseInt(params.page) : 1;
  const size = params.size ? parseInt(params.size) : 9;

  const total = await prisma.post.count({
    where: { status: Status.Published },
  });

  const totalPages = total > 0 ? Math.ceil(total / size) : 1;

  if (page > totalPages) {
    return redirect(`/posts?page=${totalPages.toString()}`);
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

  return { posts, page, size, total };
};

export const meta = () => [
  {
    title: 'Posts - Millman Photography',
  },
];

const Posts = ({ loaderData }: Route.ComponentProps) => {
  const { posts, page, size, total } = loaderData;

  const totalPages = Math.ceil(total / size);

  const fetcher = useFetcher<typeof loader>();
  const busy = fetcher.state !== 'idle';

  const onPagination = (page: number) =>
    fetcher.submit(null, { method: 'get', action: `/posts?page=${page.toString()}` });

  return (
    <>
      <PageHeader title="Posts">
        <p>Check out my posts!</p>
      </PageHeader>
      <PageCollection<PostWithTagsAndImages>
        isLoading={busy}
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
