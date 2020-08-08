import { NextPage } from 'next';

import wrapper from 'store';
import { fetchGallerySlugs, fetchGallery } from 'controllers/GalleryController';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import { useFixtures } from 'library/constants';
import { GalleryFixtures } from 'library/Fixtures';
import { promiseWrap } from 'library/utils';
import { GalleryData } from 'controllers/Types';

interface Props {
  gallery: GalleryData;
}

const Gallery: NextPage<Props> = ({ gallery }) => {
  const { title, description } = gallery;

  return (
    <Page title={title}>
      <PageHeader title={title} />
      <div>
        <p>{description}</p>
      </div>
    </Page>
  );
};

export const getStaticPaths = async () => {
  const gallerySlugs = useFixtures
    ? await promiseWrap(GalleryFixtures.fetchGallerySlugs())
    : await fetchGallerySlugs();

  const paths = gallerySlugs.map((slug: string) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = wrapper.getStaticProps(async ({ params }) => {
  if (!params || !params.slug) {
    throw new Error('No slug provided');
  }

  const slug = params.slug as string;

  const gallery = useFixtures
    ? await promiseWrap(GalleryFixtures.fetchGallery(slug))
    : await fetchGallery(slug);

  if (!gallery) {
    throw new Error('Gallery could not be found');
  }

  return {
    props: { gallery },
  };
});

export default Gallery;
