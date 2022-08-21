import { Status } from '@prisma/client';
import type { LoaderFunction, MetaFunction, RouteComponent } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import PageHeader from '~/components/PageHeader';
import bundleMDX from '~/utils/bundleMDX.server';
import prisma from '~/utils/prisma.server';

export type Frontmatter = {
  title: string;
  description: string;
};

type Data = {
  code: string;
  frontmatter: Frontmatter;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    throw new Response('Bad Request', {
      status: 400,
    });
  }

  const post = await prisma.post.findFirst({
    where: { status: Status.Published, slug },
  });

  if (!post) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const { code, frontmatter } = await bundleMDX<Frontmatter>({
    source: post.content,
  });

  return json<Data>({ code, frontmatter });
};

export const meta: MetaFunction = ({ data }) => ({
  title: `${data.frontmatter.title} - Millman Photography`,
});

const Slug: RouteComponent = () => {
  const { code, frontmatter } = useLoaderData<Data>();

  const MDX = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <PageHeader title={frontmatter.title} />
      <main>
        <p>{frontmatter.description}</p>
        <MDX />
      </main>
    </>
  );
};

export default Slug;
