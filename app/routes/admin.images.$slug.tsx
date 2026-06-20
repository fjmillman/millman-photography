import PageHeader from '~/components/PageHeader';
import prisma from '~/utils/prisma.server';

import type { Route } from './+types/admin.images.$slug';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { slug } = params;

  if (!slug) {
    return new Response('Bad Request', {
      status: 400,
    });
  }

  const image = await prisma.image.findFirst({
    where: { slug },
  });

  if (!image) {
    return new Response('Not Found', {
      status: 404,
    });
  }

  return image;
};

export const meta = ({ data }: Route.MetaArgs) => [
  {
    title: `${data.id.toString()} - Images - Admin - Millman Photography`,
  },
];

const Slug = ({ loaderData }: Route.ComponentProps) => {
  const { id, caption } = loaderData;

  return (
    <>
      <PageHeader title={id.toString()} />
      <main>
        <p>{caption}</p>
      </main>
    </>
  );
};

export default Slug;
