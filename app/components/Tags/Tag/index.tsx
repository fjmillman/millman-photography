import type { FC } from 'react';

import type { Tag as TagType } from '~/prisma/generated';

import Lozenge from '../../Lozenge';

const Tag: FC<TagType> = ({ name }) => (
  <Lozenge>
    <p>{name}</p>
  </Lozenge>
);

export default Tag;
