import { action } from '@storybook/addon-actions';

import LoginForm from '.';

export default {
  title: 'Components/Forms/Login Form',
  component: LoginForm,
};

export const Default = () => <LoginForm onSubmit={action('Clicked button')} />;
