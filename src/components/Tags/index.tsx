import { FC } from 'react';

import { Tag as TagType } from '../../controllers/Types';
import Tag from './Tag';

interface Props {
  tags: TagType[];
}

const Tags: FC<Props> = ({ tags }) => (
  <div>
    {tags.map(({ name, slug }: TagType) => (
      <Tag key={slug} name={name} slug={slug} />
    ))}
    <style jsx>{`
      display: flex;
      flex-direction: row;
    `}</style>
  </div>
);

export default Tags;
