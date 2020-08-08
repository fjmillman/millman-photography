import { NextPage } from 'next';

import wrapper from 'store';
import { fetchPosts } from 'controllers/BlogController';
import parsePostSearchFiltersFromQuery from 'utils/parsePostSearchFiltersFromQuery';
import PageHeader from 'components/PageHeader';
import Page from 'components/Page';
import PageCollection from 'components/PageCollection';
import MiniPreview from 'components/MiniPreview';
import { useFixtures } from 'library/constants';
import { BlogFixtures } from 'library/Fixtures';
import { promiseWrap } from 'library/utils';
import useBlogPage from 'hooks/useBlogPage';
import { PostData } from 'controllers/Types';
import { BlogPage } from 'types';

const Posts: NextPage<BlogPage> = ({ posts, after }) => {
  const {
    state: { currentPosts, currentPage, latestPage, hasMorePages },
    actions: { handleOnPagination },
  } = useBlogPage(posts, after);

  return (
    <Page title="Blog Posts">
      <PageHeader title="Blog Posts">
        <p>Check out my blog posts!</p>
      </PageHeader>
      <PageCollection<PostData>
        entities={currentPosts}
        selectKey={(post: PostData) => post.slug}
        selectImage={(post: PostData) => post.images[0]}
        renderContent={(post: PostData) => (
          <MiniPreview
            title={post.title}
            description={post.description}
            tags={post.tags}
            linkHref="post/[slug]"
            linkAs={`post/${post.slug}`}
          />
        )}
        fallback={<p>There are no posts!</p>}
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
    const filters = parsePostSearchFiltersFromQuery(query);

    const { posts, after } = useFixtures
      ? await promiseWrap(BlogFixtures.fetchPosts(filters))
      : await fetchPosts(filters);

    return {
      props: {
        posts,
        after,
      },
    };
  }
);

export default Posts;
