import type { FC } from 'react';

import NavigationLink from './Buttons/NavigationLink';

const NavigationBar: FC = () => (
  <nav className="flex flex-col items-center xl:flex-row gap-2">
    <NavigationLink to="/blog">Blog</NavigationLink>
    <NavigationLink to="/gallery">Gallery</NavigationLink>
  </nav>
);

export default NavigationBar;
