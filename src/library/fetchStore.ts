import initialiseStore, { AppStore } from '../store';
import { RootState } from '../store/Reducer';
import { isServer, PRELOADED_STATE } from './constants';

const fetchStore = (preloadedState?: RootState): AppStore => {
  if (isServer) {
    return initialiseStore(preloadedState);
  }

  if (!window[PRELOADED_STATE]) {
    window[PRELOADED_STATE] = initialiseStore(preloadedState);
  }

  return window[PRELOADED_STATE];
};

export default fetchStore;
