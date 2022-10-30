import type { Tag } from '@prisma/client';
import type { FC } from 'react';

import NavigationLink from './Buttons/NavigationLink';
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
      <NavigationLink to={`blog/post/${slug}`}>Read more</NavigationLink>
    </div>
  </>
);

export default PostPreview;
