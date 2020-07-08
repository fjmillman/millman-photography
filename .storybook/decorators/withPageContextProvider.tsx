import { StoryFn } from '@storybook/addons';

import { PageContextProvider } from '../../src/context/PageContext';

const withPageContextProvider = (storyFn: StoryFn<JSX.Element>) => (
  <PageContextProvider>{storyFn()}</PageContextProvider>
);

export default withPageContextProvider;
