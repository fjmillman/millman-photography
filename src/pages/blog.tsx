import { NextPage } from 'next';
import Link from 'next/link';

import { PostData } from '../controllers/Types';
import PageHeader from '../components/PageHeader';
import Page from '../components/Page';
import LinkButton from '../components/Buttons/LinkButton';
import { fetchPosts } from '../controllers/BlogController';
import wrapper from '../store';
import { PostSearchFilters } from '../store/Blog/Types';
import { Status } from '../store/Types';
import RowCollection from '../components/RowCollection';
import PostPreview from '../components/PostPreview';
import { BlogFixtures } from '../library/Fixtures';
import { useFixtures } from '../library/constants';
import { promiseWrap } from '../library/utils';

interface Props {
  posts: PostData[];
}

const Blog: NextPage<Props> = ({ posts }) => (
  <Page title="Blog">
    <PageHeader title="Blog">
      <p>Welcome to my blog!</p>
    </PageHeader>
    <RowCollection<PostData>
      entities={posts}
      selectKey={(post: PostData) => post.slug}
      selectImage={(post: PostData) => post.images[0]}
      renderContent={({ title, description, tags, slug }: PostData) => (
        <PostPreview
          title={title}
          description={description}
          tags={tags}
          slug={slug}
        />
      )}
    />
    <div>
      <Link href="blog/posts">
        <LinkButton>Check out all of my posts</LinkButton>
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
  const filters: PostSearchFilters = {
    size: 5,
    status: Status.PUBLISHED,
  };

  const { posts } = useFixtures
    ? await promiseWrap(BlogFixtures.fetchPosts(filters))
    : await fetchPosts(filters);

  return {
    props: { posts },
  };
});

export default Blog;
