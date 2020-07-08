import { FC } from 'react';
import Link from 'next/link';

import CardCollection from '../CardCollection';
import LinkButton from '../Buttons/LinkButton';
import MiniPreview from '../MiniPreview';
import { GalleryData } from '../../controllers/Types';

interface Props {
  galleries: GalleryData[];
}

const GallerySection: FC<Props> = ({ galleries }) => (
  <section>
    <div>
      <h1>Gallery</h1>
      <h2>Check out my gallery</h2>
      <CardCollection<GalleryData>
        entities={galleries}
        selectKey={(gallery: GalleryData) => gallery.slug}
        selectImage={(gallery: GalleryData) => gallery.images[0]}
        renderContent={(gallery: GalleryData) => (
          <MiniPreview
            title={gallery.title}
            description={gallery.description}
            tags={gallery.tags}
            linkHref="gallery/[slug]"
            linkAs={`gallery/${gallery.slug}`}
          />
        )}
      />
      <div className="link">
        <Link href="gallery">
          <LinkButton>Go to my gallery</LinkButton>
        </Link>
      </div>
    </div>
    <style jsx>{`
      section {
        background-color: var(--colour-white);
        min-height: var(--size-80);
        box-shadow: 0 var(--size-1) var(--size-12) rgba(0, 0, 0, 0.5);

        position: relative;
        width: var(--size-screen-w);
        margin-left: -50vw;
        left: 50%;
      }

      section > div {
        max-width: var(--screen-lg);
        margin: auto;
        padding: var(--size-12);
        display: flex;
        flex-direction: column;
      }

      .link {
        margin: var(--size-12) auto 0 auto;
      }

      h1 {
        font-size: var(--size-6);
        font-weight: bold;
        margin-bottom: var(--size-1);
        text-align: center;
      }

      h2 {
        font-size: var(--size-4);
        margin-bottom: var(--size-8);
        text-align: center;
      }
    `}</style>
  </section>
);

export default GallerySection;
