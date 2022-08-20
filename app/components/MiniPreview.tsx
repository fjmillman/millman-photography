import type { Tag } from '@prisma/client';
import { Link } from '@remix-run/react';
import type { FC } from 'react';

import arrowRight from '~/icons/arrow-right.svg';

import Tags from './Tags';

type Props = {
  title: string;
  description: string;
  tags: Tag[];
  linkTo: string;
};

const MiniPreview: FC<Props> = ({ title, description, tags, linkTo }) => (
  <>
    <div>
      <h1 className="font-bold">{title}</h1>
      <p>{description}</p>
    </div>
    <div className="flex flex-row justify-between items-center">
      <Tags tags={tags} />
      <Link to={linkTo}>
        <div className="h-8 w-8 p-1 cursor-pointer shadow-md rounded-sm text-black bg-white hover:bg-gray-200">
          <img src={arrowRight} alt="arrow right" height={50} width={50} />
        </div>
      </Link>
    </div>
  </>
);

export default MiniPreview;
