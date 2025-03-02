
import NavigationLink from '~/components/Buttons/NavigationLink';
import GalleryPreview from '~/components/GalleryPreview';
import PageHeader from '~/components/PageHeader';
import RowCollection from '~/components/RowCollection';
import { Status } from '~/prisma/generated';
import prisma from '~/utils/prisma.server';

import type { Route } from './+types/gallery';
import type { GalleryWithTagsAndImages } from './galleries';

export const loader = async () => {
  const galleries: GalleryWithTagsAndImages[] = await prisma.gallery.findMany({
    where: { status: Status.Published },
    include: {
      tags: { include: { tag: true } },
      images: { include: { image: true } },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return { galleries };
};

export const meta = () => [
  {
    title: 'Gallery - Millman Photography',
  },
];

const Blog = ({ loaderData }: Route.ComponentProps) => {
  const { galleries } = loaderData;

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
