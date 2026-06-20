import { Status } from '@prisma/client-generated';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import PageHeader from '~/components/PageHeader';
import bundleMDX from '~/utils/bundleMDX.server';
import prisma from '~/utils/prisma.server';

import type { Route } from './+types/posts.$slug';

export interface Frontmatter {
  title: string;
  description: string;
}

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { slug } = params;

  if (!slug) {
    return new Response('Bad Request', {
      status: 400,
    });
  }

  const post = await prisma.post.findFirst({
    where: { status: Status.Published, slug },
  });

  if (!post) {
    return new Response('Not Found', {
      status: 404,
    });
  }

  const { code, frontmatter } = await bundleMDX<Frontmatter>({
    source: post.content,
  });

  return { code, frontmatter };
};

export const meta = ({ data }: Route.MetaArgs) => [
  {
    title: `${data.frontmatter.title} - Millman Photography`,
  },
];

const Slug = ({ loaderData }: Route.ComponentProps) => {
  const { code, frontmatter } = loaderData;

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
