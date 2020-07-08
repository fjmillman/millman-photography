import { NextPage } from 'next';

import { GalleryData, PostData } from '../controllers/Types';
import wrapper from '../store';
import { PostSearchFilters } from '../store/Blog/Types';
import { fetchPosts } from '../controllers/BlogController';
import { GallerySearchFilters } from '../store/Galleries/Types';
import { fetchGalleries } from '../controllers/GalleryController';
import Page from '../components/Page';
import BlogSection from '../components/Sections/BlogSection';
import GallerySection from '../components/Sections/GallerySection';
import AboutMeSection from '../components/Sections/AboutMeSection';
import HeroSection from '../components/Sections/HeroSection';
import ServicesSection from '../components/Sections/ServicesSection';
import { Status } from '../store/Types';
import { useFixtures } from '../library/constants';
import { BlogFixtures, GalleryFixtures } from '../library/Fixtures';
import { promiseWrap } from '../library/utils';

interface Props {
  latestPosts: PostData[];
  latestGalleries: GalleryData[];
}

const Home: NextPage<Props> = ({ latestPosts, latestGalleries }) => (
  <Page>
    <HeroSection />
    <BlogSection posts={latestPosts} />
    <AboutMeSection />
    <GallerySection galleries={latestGalleries} />
    <ServicesSection />
  </Page>
);

export const getStaticProps = wrapper.getStaticProps(async () => {
  const postsFilters: PostSearchFilters = {
    size: 3,
    status: Status.PUBLISHED,
  };

  const { posts } = useFixtures
    ? await promiseWrap(BlogFixtures.fetchPosts(postsFilters))
    : await fetchPosts(postsFilters);

  const galleriesFilters: GallerySearchFilters = {
    size: 3,
    status: Status.PUBLISHED,
  };

  const { galleries } = useFixtures
    ? await promiseWrap(GalleryFixtures.fetchGalleries(galleriesFilters))
    : await fetchGalleries(galleriesFilters);

  return {
    props: {
      latestPosts: posts,
      latestGalleries: galleries,
    },
  };
});

export default Home;
