import { FC } from 'react';

import { Tag as TagType } from 'controllers/Types';
import Lozenge from '../../Lozenge';

const Tag: FC<TagType> = ({ name }) => (
  <Lozenge>
    <p>{name}</p>
  </Lozenge>
);

export default Tag;
