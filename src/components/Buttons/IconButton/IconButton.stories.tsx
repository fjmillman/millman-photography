import { action } from '@storybook/addon-actions';
import Image from 'react-optimized-image';

import MenuIcon from '../../../icons/menu-icon.svg';

import IconButton from '.';

export default {
  title: 'Components/Buttons/Icon Button',
  component: IconButton,
};

export const WithIcon = () => (
  <IconButton onClick={action('Clicked icon button')}>
    <Image src={MenuIcon} />
  </IconButton>
);
