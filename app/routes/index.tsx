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

import type { GalleryWithTagsAndImages } from './galleries';
import type { PostWithTagsAndImages } from './posts';

type RouteParams = {
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

  return json<RouteParams>({ posts, galleries });
};

export const meta: MetaFunction = () => ({
  title: 'Millman Photography',
});

const Index: RouteComponent = () => {
  const { posts: serializedPosts, galleries: serializedGalleries } = useLoaderData<RouteParams>();

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

  const galleries = serializedGalleries.map((gallery) => ({
    ...gallery,
    publishedAt: gallery.publishedAt ? new Date(gallery.publishedAt) : null,
    createdAt: new Date(gallery.createdAt),
    updatedAt: new Date(gallery.updatedAt),
    tags: gallery.tags.map((tag) => ({
      ...tag,
      tag: {
        ...tag.tag,
        createdAt: new Date(tag.tag.createdAt),
        updatedAt: new Date(tag.tag.updatedAt),
      },
    })),
    images: gallery.images.map((image) => ({
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
      <HeroSection />
      <BlogSection posts={posts} />
      <AboutMeSection />
      <GallerySection galleries={galleries} />
      <ServicesSection />
    </>
  );
};

export default Index;
