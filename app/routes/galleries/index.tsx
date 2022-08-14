import type { Gallery, Image, ImageOnGalleries, Tag, TagOnGalleries } from '@prisma/client';
import { Status } from '@prisma/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useSubmit, useTransition } from '@remix-run/react';

import MiniPreview from '~/components/MiniPreview';
import PageCollection from '~/components/PageCollection';
import PageHeader from '~/components/PageHeader';
import prisma from '~/utils/prisma.server';

export type GalleryWithTagsAndImages = Gallery & {
  tags: (TagOnGalleries & {
    tag: Tag;
  })[];
  images: (ImageOnGalleries & {
    image: Image;
  })[];
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const page = params.page ? parseInt(params.page) : 1;
  const size = params.size ? parseInt(params.size) : 9;

  const total = await prisma.gallery.count({
    where: { status: Status.Published },
  });

  const galleries = await prisma.gallery.findMany({
    include: {
      tags: { include: { tag: true } },
      images: { include: { image: true } },
    },
    where: { status: Status.Published },
    take: size,
    skip: (page - 1) * size,
  });

  return json({ galleries, page, size, total });
};

export const meta: MetaFunction = () => ({
  title: 'Galleries - Millman Photography',
});

const Galleries = () => {
  const {
    galleries: serializedGalleries,
    page,
    size,
    total,
  } = useLoaderData<{
    galleries: GalleryWithTagsAndImages[];
    page: number;
    size: number;
    total: number;
  }>();

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

  const totalPages = Math.ceil(total / size);

  const submit = useSubmit();
  const { state } = useTransition();

  const onPagination = (page: number) => submit(null, { method: 'get', action: `/galleries?page=${page}` });

  return (
    <>
      <PageHeader title="Galleries">
        <p>Check out my galleries!</p>
      </PageHeader>
      <PageCollection<GalleryWithTagsAndImages>
        isLoading={state === 'submitting'}
        entities={galleries}
        selectKey={(gallery: GalleryWithTagsAndImages) => gallery.slug}
        selectImage={(gallery: GalleryWithTagsAndImages) => gallery.images[0].image}
        renderContent={(gallery: GalleryWithTagsAndImages) => (
          <MiniPreview
            title={gallery.title}
            description={gallery.description}
            tags={gallery.tags.map(({ tag }) => tag)}
            linkTo={gallery.slug}
          />
        )}
        fallback={<p>There are no galleries!</p>}
        currentPage={page}
        totalPages={totalPages}
        onPagination={onPagination}
      />
    </>
  );
};

export default Galleries;
