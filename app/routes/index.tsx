import { Status } from '@prisma/client';
import type { LoaderFunction, MetaFunction, RouteComponent } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import AboutMeSection from '~/components/Sections/AboutMeSection';
import BlogSection from '~/components/Sections/BlogSection';
import GallerySection from '~/components/Sections/GallerySection';
import HeroSection from '~/components/Sections/HeroSection';
import ServicesSection from '~/components/Sections/ServicesSection';
import prisma from '~/utils/prisma.server';
import { unserializeGallery, unserializePost } from '~/utils/serialization';

import type { GalleryWithTagsAndImages } from './galleries';
import type { PostWithTagsAndImages } from './posts';

type Data = {
  posts: PostWithTagsAndImages[];
  galleries: GalleryWithTagsAndImages[];
};

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

  const galleries: GalleryWithTagsAndImages[] = await prisma.gallery.findMany({
    where: { status: Status.Published },
    include: {
      tags: { include: { tag: true } },
      images: { include: { image: true } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return json<Data>({ posts, galleries });
};

export const meta: MetaFunction = () => ({
  title: 'Millman Photography',
});

const Index: RouteComponent = () => {
  const { posts: serializedPosts, galleries: serializedGalleries } = useLoaderData<Data>();

  const posts = serializedPosts.map((post) => unserializePost(post));
  const galleries = serializedGalleries.map((gallery) => unserializeGallery(gallery));

  return (
    <>
      <HeroSection />
      <BlogSection posts={posts} />
      <AboutMeSection />
      <GallerySection galleries={galleries} />
      <ServicesSection />
    </>
  );
};

export default Index;
