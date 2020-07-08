import { Provider } from 'react-redux';
import { StoryFn } from '@storybook/addons';

import { AppStore } from '../../src/store';

const withRedux = (store: AppStore) => (storyFn: StoryFn<JSX.Element>) => (
  <Provider store={store}>{storyFn()}</Provider>
);

export default withRedux;
