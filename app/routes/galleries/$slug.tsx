import type { Gallery } from '@prisma/client';
import { Status } from '@prisma/client';
import type { LoaderFunction, MetaFunction, RouteComponent } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import PageHeader from '~/components/PageHeader';
import prisma from '~/utils/prisma.server';

type Data = Gallery;

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    throw new Response('Bad Request', {
      status: 400,
    });
  }

  const gallery = await prisma.gallery.findFirst({
    where: { status: Status.Published, slug },
  });

  if (!gallery) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return json<Data>(gallery);
};

export const meta: MetaFunction = ({ data }) => ({
  title: `${data.title} - Millman Photography`,
});

const Slug: RouteComponent = () => {
  const { title, description } = useLoaderData<Data>();

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
