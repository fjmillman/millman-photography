import type { Gallery, Image, ImageOnGalleries, Tag, TagOnGalleries } from '@prisma/client';
import { Status } from '@prisma/client';
import { redirect, useFetcher } from 'react-router';

import MiniPreview from '~/components/MiniPreview';
import PageCollection from '~/components/PageCollection';
import PageHeader from '~/components/PageHeader';
import prisma from '~/utils/prisma.server';

import type { Route } from './+types/galleries';

export type GalleryWithTagsAndImages = Gallery & {
  tags: (TagOnGalleries & {
    tag: Tag;
  })[];
  images: (ImageOnGalleries & {
    image: Image;
  })[];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const page = params.page ? parseInt(params.page) : 1;
  const size = params.size ? parseInt(params.size) : 9;

  const total = await prisma.gallery.count({
    where: { status: Status.Published },
  });

  const totalPages = total > 0 ? Math.ceil(total / size) : 1;

  if (page > totalPages) {
    return redirect(`/galleries?page=${totalPages.toString()}`);
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

  return { galleries, page, size, total };
};

export const meta = () => [
  {
    title: 'Galleries - Millman Photography',
  },
];

const Galleries = ({ loaderData }: Route.ComponentProps) => {
  const { galleries, page, size, total } = loaderData;

  const totalPages = Math.ceil(total / size);

  const fetcher = useFetcher<Route.LoaderArgs>();
  const busy = fetcher.state !== 'idle';

  const onPagination = (page: number) =>
    fetcher.submit(null, { method: 'get', action: `/galleries?page=${page.toString()}` });

  return (
    <>
      <PageHeader title="Galleries">
        <p>Check out my galleries!</p>
      </PageHeader>
      <PageCollection<GalleryWithTagsAndImages>
        isLoading={busy}
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
