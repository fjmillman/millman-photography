import { NextPage } from 'next';

import wrapper from 'store';
import parseGallerySearchFiltersFromQuery from 'utils/parseGallerySearchFiltersFromQuery';
import PageHeader from 'components/PageHeader';
import Page from 'components/Page';
import { fetchGalleries } from 'controllers/GalleryController';
import PageCollection from 'components/PageCollection';
import MiniPreview from 'components/MiniPreview';
import { useFixtures } from 'library/constants';
import { GalleryFixtures } from 'library/Fixtures';
import { promiseWrap } from 'library/utils';
import useGalleriesPage from 'hooks/useGalleriesPage';
import { GalleriesPage } from 'types';
import { GalleryData } from 'controllers/Types';

const Galleries: NextPage<GalleriesPage> = ({ galleries, after }) => {
  const {
    state: { currentGalleries, currentPage, latestPage, hasMorePages },
    actions: { handleOnPagination },
  } = useGalleriesPage(galleries, after);

  return (
    <Page title="Galleries">
      <PageHeader title="Galleries">
        <p>Check out my galleries!</p>
      </PageHeader>
      <PageCollection<GalleryData>
        entities={currentGalleries}
        selectKey={(gallery: GalleryData) => gallery.slug}
        selectImage={(gallery: GalleryData) => gallery.images[0]}
        renderContent={(gallery: GalleryData) => (
          <MiniPreview
            title={gallery.title}
            description={gallery.description}
            tags={gallery.tags}
            linkHref="[slug]"
            linkAs={gallery.slug}
          />
        )}
        fallback={<p>There are no galleries!</p>}
        currentPage={currentPage}
        latestPage={latestPage}
        hasMorePages={hasMorePages}
        onPagination={handleOnPagination}
      />
    </Page>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query }) => {
    const filters = parseGallerySearchFiltersFromQuery(query);

    const { galleries, after } = useFixtures
      ? await promiseWrap(GalleryFixtures.fetchGalleries(filters))
      : await fetchGalleries(filters);

    return {
      props: {
        galleries,
        after,
      },
    };
  }
);

export default Galleries;
