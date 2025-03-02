import PageHeader from '~/components/PageHeader';
import { Status } from '~/prisma/generated';
import prisma from '~/utils/prisma.server';

import type { Route } from './+types/galleries.$slug';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { slug } = params;

  if (!slug) {
    return new Response('Bad Request', {
      status: 400,
    });
  }

  const gallery = await prisma.gallery.findFirst({
    where: { status: Status.Published, slug },
  });

  if (!gallery) {
    return new Response('Not Found', {
      status: 404,
    });
  }

  return gallery;
};

export const meta = ({ data }: Route.MetaArgs) => [
  {
    title: `${data.title} - Millman Photography`,
  },
];

const Slug = ({ loaderData }: Route.ComponentProps) => {
  const { title, description } = loaderData;

  return (
    <>
      <PageHeader title={title} />
      <main>
        <p>{description}</p>
      </main>
    </>
  );
};

export default Slug;
