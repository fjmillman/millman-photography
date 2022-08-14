import { Status } from '@prisma/client';
import type { LoaderFunction, MetaFunction, RouteComponent } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import LinkButton from '~/components/Buttons/LinkButton';
import GalleryPreview from '~/components/GalleryPreview';
import PageHeader from '~/components/PageHeader';
import RowCollection from '~/components/RowCollection';
import prisma from '~/utils/prisma.server';

import type { GalleryWithTagsAndImages } from './galleries';

export const loader: LoaderFunction = async () => {
  const galleries: GalleryWithTagsAndImages[] = await prisma.gallery.findMany({
    where: { status: Status.Published },
    include: {
      tags: { include: { tag: true } },
      images: { include: { image: true } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return json(galleries);
};

export const meta: MetaFunction = () => ({
  title: 'Gallery - Millman Photography',
});

const Blog: RouteComponent = () => {
  const serializedGalleries = useLoaderData<GalleryWithTagsAndImages[]>();

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
      <PageHeader title="Gallery">
        <p>Welcome to my gallery!</p>
      </PageHeader>
      <RowCollection<GalleryWithTagsAndImages>
        entities={galleries}
        selectKey={(gallery: GalleryWithTagsAndImages) => gallery.slug}
        selectImage={(gallery: GalleryWithTagsAndImages) => gallery.images[0]?.image}
        renderContent={({ title, description, tags, slug }: GalleryWithTagsAndImages) => (
          <GalleryPreview title={title} description={description} tags={tags.map(({ tag }) => tag)} slug={slug} />
        )}
      />
      <div className="flex w-full justify-around mt-8">
        <Link to="/galleries">
          <LinkButton>Check out all of my galleries</LinkButton>
        </Link>
      </div>
    </>
  );
};

export default Blog;
