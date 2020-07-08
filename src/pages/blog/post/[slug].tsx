import { NextPage } from 'next';

import wrapper from '../../../store';
import { fetchPostSlugs, fetchPost } from '../../../controllers/BlogController';
import Page from '../../../components/Page';
import PageHeader from '../../../components/PageHeader';
import { useFixtures } from '../../../library/constants';
import { BlogFixtures } from '../../../library/Fixtures';
import { promiseWrap } from '../../../library/utils';
import { PostData } from '../../../controllers/Types';

interface Props {
  post: PostData;
}

const Post: NextPage<Props> = ({ post: { title, description, body } }) => {
  return (
    <Page title={title}>
      <PageHeader title={title} />
      <div>
        <p>{description}</p>
        <p>{body}</p>
      </div>
    </Page>
  );
};

export const getStaticPaths = async () => {
  const postSlugs = useFixtures
    ? await promiseWrap(BlogFixtures.fetchPostSlugs())
    : await fetchPostSlugs();

  const paths = postSlugs.map((slug: string) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = wrapper.getStaticProps(async ({ params }) => {
  if (!params || !params.slug) {
    throw new Error('No slug provided');
  }

  const slug = params.slug as string;

  const post = useFixtures
    ? await promiseWrap(BlogFixtures.fetchPost(slug))
    : await fetchPost(slug);

  if (!post) {
    throw new Error('Post could not be found');
  }

  return {
    props: {
      post,
    },
  };
});

export default Post;
