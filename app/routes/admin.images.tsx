import type { Image, Tag, TagOnImages } from '@prisma/client-generated';
import { redirect, useFetcher } from 'react-router';

import MiniPreview from '~/components/MiniPreview';
import PageCollection from '~/components/PageCollection';
import PageHeader from '~/components/PageHeader';
import prisma from '~/utils/prisma.server';

import type { Route } from './+types/admin.images';

export type ImageWithTags = Image & {
  tags: (TagOnImages & {
    tag: Tag;
  })[];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const page = params.page ? parseInt(params.page) : 1;
  const size = params.size ? parseInt(params.size) : 9;

  const total = await prisma.image.count();

  const totalPages = total > 0 ? Math.ceil(total / size) : 1;

  if (page > totalPages) {
    return redirect(`/admin/images?page=${totalPages.toString()}`);
  }

  const images = await prisma.image.findMany({
    include: {
      tags: { include: { tag: true } },
    },
    take: size,
    skip: (page - 1) * size,
  });

  return { images, page, size, total };
};

export const meta = () => [
  {
    title: 'Images - Admin - Millman Photography',
  },
];

const Images = ({ loaderData }: Route.ComponentProps) => {
  const { images, page, size, total } = loaderData;

  const totalPages = Math.ceil(total / size);

  const fetcher = useFetcher<Route.LoaderArgs>();
  const busy = fetcher.state !== 'idle';

  const onPagination = (page: number) =>
    fetcher.submit(null, { method: 'get', action: `/admin/images?page=${page.toString()}` });

  return (
    <>
      <PageHeader title="Images">
        <p>Check out my images!</p>
      </PageHeader>
      <PageCollection<ImageWithTags>
        isLoading={busy}
        entities={images}
        selectKey={(image: ImageWithTags) => image.slug}
        selectImage={(image: ImageWithTags) => image}
        renderContent={(image: ImageWithTags) => (
          <MiniPreview
            title={image.id.toString()}
            description={image.caption}
            tags={image.tags.map(({ tag }) => tag)}
            linkTo={image.slug}
          />
        )}
        fallback={<p>There are no images!</p>}
        currentPage={page}
        totalPages={totalPages}
        onPagination={onPagination}
      />
    </>
  );
};

export default Images;
