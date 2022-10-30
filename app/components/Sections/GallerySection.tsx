import type { FC } from 'react';

import type { GalleryWithTagsAndImages } from '~/routes/galleries';

import NavigationLink from '../Buttons/NavigationLink';
import CardCollection from '../CardCollection';
import MiniPreview from '../MiniPreview';

type Props = {
  galleries: GalleryWithTagsAndImages[];
};

const GallerySection: FC<Props> = ({ galleries }) => (
  <section className="bg-white shadow-md relative w-screen ml-[-50vw] left-1/2">
    <div className="max-w-screen-lg m-auto p-12 flex flex-col">
      <h1 className="text-xl font-bold mb-1 text-center">Gallery</h1>
      <h2 className="text-lg mb-8 text-center">Check out my gallery</h2>
      <CardCollection<GalleryWithTagsAndImages>
        entities={galleries}
        selectKey={(gallery: GalleryWithTagsAndImages) => gallery.slug}
        selectImage={(gallery: GalleryWithTagsAndImages) => gallery.images[0]?.image}
        renderContent={(gallery: GalleryWithTagsAndImages) => (
          <MiniPreview
            title={gallery.title}
            description={gallery.description}
            tags={gallery.tags.map(({ tag }) => tag)}
            linkTo={`/galleries/${gallery.slug}`}
          />
        )}
      />
      <div className="text-md font-bold mt-12 mx-auto">
        <NavigationLink to="/gallery">Go to my gallery</NavigationLink>
      </div>
    </div>
  </section>
);

export default GallerySection;
