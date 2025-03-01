import type { Tag as TagType } from '@prisma/client';
import type { FC } from 'react';

import Lozenge from '../../Lozenge';

const Tag: FC<TagType> = ({ name }) => (
  <Lozenge>
    <p>{name}</p>
  </Lozenge>
);

export default Tag;
