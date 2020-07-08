import withPageContextProvider from '../../../.storybook/decorators/withPageContextProvider';
import withRedux from '../../../.storybook/decorators/withRedux';
import { createStore } from '../../store';

import Layout from '.';

const store = createStore();

export default {
  title: 'Components/Layout',
  component: Layout,
  decorators: [withRedux(store), withPageContextProvider],
};

export const Normal = () => <Layout />;
