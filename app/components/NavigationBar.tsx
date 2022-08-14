import type { FC } from 'react';

import useWindowWidth from '~/hooks/useWindowWidth';

import NavigationLink from './Buttons/NavigationLink';

const NavigationBar: FC = () => {
  const width = useWindowWidth();

  return (
    <nav className={`flex flex-grow ${width <= 1280 ? 'flex-row' : 'flex-col'}`}>
      <NavigationLink to="/blog">Blog</NavigationLink>
      <NavigationLink to="/gallery">Gallery</NavigationLink>
    </nav>
  );
};

export default NavigationBar;
