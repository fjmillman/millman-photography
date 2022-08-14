import type { Tag as TagType } from '@prisma/client';
import type { FC } from 'react';

import Tag from './Tag';

type Props = {
  tags: TagType[];
};

const Tags: FC<Props> = ({ tags }) => (
  <div className="flex flex-row">
    {tags.map(({ id, name, slug, createdAt, updatedAt }: TagType) => (
      <Tag key={slug} id={id} name={name} slug={slug} createdAt={createdAt} updatedAt={updatedAt} />
    ))}
  </div>
);

export default Tags;
