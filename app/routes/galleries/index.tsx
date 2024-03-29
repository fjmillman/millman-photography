import type { Gallery, Image, ImageOnGalleries, Tag, TagOnGalleries } from '@prisma/client';
import { Status } from '@prisma/client';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useSubmit, useTransition } from '@remix-run/react';

import MiniPreview from '~/components/MiniPreview';
import PageCollection from '~/components/PageCollection';
import PageHeader from '~/components/PageHeader';
import prisma from '~/utils/prisma.server';
import { unserializeGallery } from '~/utils/serialization';

export type GalleryWithTagsAndImages = Gallery & {
  tags: (TagOnGalleries & {
    tag: Tag;
  })[];
  images: (ImageOnGalleries & {
    image: Image;
  })[];
};

type Data = {
  galleries: GalleryWithTagsAndImages[];
  page: number;
  size: number;
  total: number;
};

export const loader: LoaderFunction = async ({ params }) => {
  const page = params.page ? parseInt(params.page) : 1;
  const size = params.size ? parseInt(params.size) : 9;

  const total = await prisma.gallery.count({
    where: { status: Status.Published },
  });

  const totalPages = total > 0 ? Math.ceil(total / size) : 1;

  if (page > totalPages) {
    return redirect(`/galleries?page=${totalPages}`);
  }

  const galleries = await prisma.gallery.findMany({
    include: {
      tags: { include: { tag: true } },
      images: { include: { image: true } },
    },
    where: { status: Status.Published },
    take: size,
    skip: (page - 1) * size,
  });

  return json<Data>({ galleries, page, size, total });
};

export const meta: MetaFunction = () => ({
  title: 'Galleries - Millman Photography',
});

const Galleries = () => {
  const { galleries: serializedGalleries, page, size, total } = useLoaderData<Data>();

  const galleries = serializedGalleries.map((gallery) => unserializeGallery(gallery));

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
        selectImage={(gallery: GalleryWithTagsAndImages) => gallery.images[0]?.image}
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
