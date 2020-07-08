import { FC } from 'react';
import Image from 'react-optimized-image';
import Link from 'next/link';

import { Tag } from '../../controllers/Types';
import Tags from '../Tags';
import IconLinkButton from '../Buttons/IconLinkButton';

import ArrowRight from '../../icons/arrow-right.svg';

interface Props {
  title: string;
  description: string;
  tags: Tag[];
  linkHref: string;
  linkAs: string;
}

const MiniPreview: FC<Props> = ({
  title,
  description,
  tags,
  linkHref,
  linkAs,
}) => (
  <>
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
    <div className="footer">
      <Tags tags={tags} />
      <Link href={linkHref} as={linkAs}>
        <IconLinkButton>
          <Image src={ArrowRight} inline webp />
        </IconLinkButton>
      </Link>
    </div>
    <style jsx>{`
      h1 {
        font-weight: bold;
      }

      .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    `}</style>
  </>
);

export default MiniPreview;
