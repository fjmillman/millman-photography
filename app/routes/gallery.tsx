import { Status } from '@prisma/client';
import type { LoaderFunction, MetaFunction, RouteComponent } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import NavigationLink from '~/components/Buttons/NavigationLink';
import GalleryPreview from '~/components/GalleryPreview';
import PageHeader from '~/components/PageHeader';
import RowCollection from '~/components/RowCollection';
import prisma from '~/utils/prisma.server';
import { unserializeGallery } from '~/utils/serialization';

import type { GalleryWithTagsAndImages } from './galleries';

type Data = GalleryWithTagsAndImages[];

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

  return json<Data>(galleries);
};

export const meta: MetaFunction = () => ({
  title: 'Gallery - Millman Photography',
});

const Blog: RouteComponent = () => {
  const serializedGalleries = useLoaderData<Data>();

  const galleries = serializedGalleries.map((gallery) => unserializeGallery(gallery));

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
        <NavigationLink to="/galleries">Check out all of my galleries</NavigationLink>
      </div>
    </>
  );
};

export default Blog;
