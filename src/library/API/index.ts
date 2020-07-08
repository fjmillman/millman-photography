import UserAPI from './UserAPI';
import BlogAPI from './BlogAPI';
import GalleryAPI from './GalleryAPI';
import { useFixtures as isUseFixtures } from '../constants';

const API = (useFixtures: boolean) => {
  const user = UserAPI(useFixtures);
  const blog = BlogAPI(useFixtures);
  const gallery = GalleryAPI(useFixtures);

  return {
    user,
    blog,
    gallery,
  };
};

const api = API(isUseFixtures);

export type APIType = typeof api;

export default api;
