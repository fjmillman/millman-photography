import { PostSearchFilters } from '../../store/Blog/Types';
import { BlogFixtures } from '../Fixtures';
import { responseWrap, promiseWrap } from '../utils';

const BlogAPI = (useFixtures: boolean) => {
  const getUrl = () => 'api/blog';

  const fetchPosts = (filters: PostSearchFilters) => {
    if (useFixtures) {
      return promiseWrap(responseWrap(BlogFixtures.fetchPosts(filters)));
    }

    return fetch(`${getUrl()}/posts`, {
      method: 'POST',
      body: JSON.stringify(filters),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return {
    fetchPosts,
  };
};

export default BlogAPI;
