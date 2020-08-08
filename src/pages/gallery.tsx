import { NextPage } from 'next';
import Link from 'next/link';

import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import LinkButton from 'components/Buttons/LinkButton';
import wrapper from 'store';
import { fetchGalleries } from 'controllers/GalleryController';
import { GallerySearchFilters } from 'store/Galleries/Types';
import { Status } from 'store/Types';
import RowCollection from 'components/RowCollection';
import GalleryPreview from 'components/GalleryPreview';
import { useFixtures } from 'library/constants';
import { GalleryFixtures } from 'library/Fixtures';
import { promiseWrap } from 'library/utils';
import { GalleryData } from 'controllers/Types';

interface Props {
  galleries: GalleryData[];
}

const GalleryPage: NextPage<Props> = ({ galleries }) => (
  <Page title="Gallery">
    <PageHeader title="Gallery">
      <p>Welcome to my gallery!</p>
    </PageHeader>
    <RowCollection<GalleryData>
      entities={galleries}
      selectKey={(gallery: GalleryData) => gallery.slug}
      selectImage={(gallery: GalleryData) => gallery.images[0]}
      renderContent={({ title, description, tags, slug }: GalleryData) => (
        <GalleryPreview
          title={title}
          description={description}
          tags={tags}
          slug={slug}
        />
      )}
    />
    <div>
      <Link href="gallery/galleries">
        <LinkButton>Check out all of my galleries</LinkButton>
      </Link>
    </div>
    <style jsx>{`
      div {
        display: flex;
        width: var(--size-full);
        justify-content: space-around;
        margin-top: var(--size-8);
      }
    `}</style>
  </Page>
);

export const getStaticProps = wrapper.getStaticProps(async () => {
  const filters: GallerySearchFilters = {
    size: 5,
    status: Status.PUBLISHED,
  };

  const { galleries } = useFixtures
    ? await promiseWrap(GalleryFixtures.fetchGalleries(filters))
    : await fetchGalleries(filters);

  return {
    props: { galleries },
  };
});

export default GalleryPage;
