import withPageContextProvider from '../../../.storybook/decorators/withPageContextProvider';
import withRedux from '../../../.storybook/decorators/withRedux';
import { createStore } from '../../store';

import Header from '.';

const store = createStore();

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [withRedux(store), withPageContextProvider],
};

export const Default = () => <Header />;
