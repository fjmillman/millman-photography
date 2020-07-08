import withPageContextProvider from '../../../.storybook/decorators/withPageContextProvider';

import NavigationBar from '.';

export default {
  title: 'Components/Navigation Bar',
  component: NavigationBar,
  decorators: [withPageContextProvider],
};

export const Default = () => <NavigationBar />;
