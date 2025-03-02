
import AboutMeSection from '~/components/Sections/AboutMeSection';
import BlogSection from '~/components/Sections/BlogSection';
import GallerySection from '~/components/Sections/GallerySection';
import HeroSection from '~/components/Sections/HeroSection';
import ServicesSection from '~/components/Sections/ServicesSection';
import { Status } from '~/prisma/generated';
import prisma from '~/utils/prisma.server';

import type { Route } from './+types/_index';
import type { GalleryWithTagsAndImages } from './galleries';
import type { PostWithTagsAndImages } from './posts';

export const loader = async () => {
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

  return { posts, galleries };
};

export const meta = () => [
  {
    title: 'Millman Photography',
  },
];

const Index = ({ loaderData }: Route.ComponentProps) => {
  const { posts, galleries } = loaderData;

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
