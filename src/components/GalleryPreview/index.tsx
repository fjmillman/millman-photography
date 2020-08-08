import { FC } from 'react';
import Link from 'next/link';

import { Tag } from 'controllers/Types';
import Tags from '../Tags';
import LinkButton from '../Buttons/LinkButton';

interface Props {
  title: string;
  description: string;
  tags: Tag[];
  slug: string;
}

const GalleryPreview: FC<Props> = ({ title, description, tags, slug }) => (
  <>
    <h1>{title}</h1>
    <h2>{description}</h2>
    <Tags tags={tags} />
    <div className="link">
      <Link href="gallery/[slug]" as={`gallery/${slug}`}>
        <LinkButton>Check out the gallery</LinkButton>
      </Link>
    </div>
    <style>{`
      h1 {
        font-size: var(--size-6);
        font-weight: bold;
        margin-bottom: var(--size-1);
      }

      h2 {
        font-size: var(--size-4);
        margin-bottom: var(--size-8);
      }

      .link {
        margin: var(--size-12) auto 0 auto;
      }
    `}</style>
  </>
);

export default GalleryPreview;
