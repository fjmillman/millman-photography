import { GallerySearchFilters } from '../../store/Galleries/Types';
import { GalleryFixtures } from '../Fixtures';
import { responseWrap, promiseWrap } from '../utils';
import { getApiUrl } from '../constants';

const GalleryAPI = (useFixtures: boolean) => {
  const getUrl = () => `${getApiUrl()}/gallery`;

  const fetchGalleries = (filters: GallerySearchFilters) => {
    if (useFixtures) {
      return promiseWrap(responseWrap(GalleryFixtures.fetchGalleries(filters)));
    }

    return fetch(`${getUrl()}/galleries`, {
      method: 'POST',
      body: JSON.stringify(filters),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return {
    fetchGalleries,
  };
};

export default GalleryAPI;
