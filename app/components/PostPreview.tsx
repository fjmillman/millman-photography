import type { Tag } from '@prisma/client';
import { Link } from '@remix-run/react';
import type { FC } from 'react';

import LinkButton from './Buttons/LinkButton';
import Tags from './Tags';

type Props = {
  title: string;
  description: string;
  tags: Tag[];
  slug: string;
};

const PostPreview: FC<Props> = ({ title, description, tags, slug }) => (
  <>
    <h1 className="text-md font-bold mb-1">{title}</h1>
    <h2 className="text-sm mb-8">{description}</h2>
    <Tags tags={tags} />
    <div className="mt-12 mx-auto">
      <Link to={`blog/post/${slug}`}>
        <LinkButton>Read more</LinkButton>
      </Link>
    </div>
  </>
);

export default PostPreview;
