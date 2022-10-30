import { Status } from '@prisma/client';
import type { LoaderFunction, MetaFunction, RouteComponent } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import NavigationLink from '~/components/Buttons/NavigationLink';
import PageHeader from '~/components/PageHeader';
import PostPreview from '~/components/PostPreview';
import RowCollection from '~/components/RowCollection';
import prisma from '~/utils/prisma.server';
import { unserializePost } from '~/utils/serialization';

import type { PostWithTagsAndImages } from './posts';

type Data = PostWithTagsAndImages[];

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

  return json<Data>(posts);
};

export const meta: MetaFunction = () => ({
  title: 'Blog - Millman Photography',
});

const Blog: RouteComponent = () => {
  const serializedPosts = useLoaderData<Data>();

  const posts = serializedPosts.map((post) => unserializePost(post));

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
        <NavigationLink to="/posts">Check out all of my posts</NavigationLink>
      </div>
    </>
  );
};

export default Blog;
