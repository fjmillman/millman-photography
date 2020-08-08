import { useContext, FC } from 'react';

import PageContext from 'context/PageContext';
import NavigationLink from '../Buttons/NavigationLink';

const NavigationBar: FC = () => {
  const { isDesktopView } = useContext(PageContext);

  return (
    <nav>
      <NavigationLink href="/blog">Blog</NavigationLink>
      <NavigationLink href="/gallery">Gallery</NavigationLink>
      <style jsx>{`
        nav {
          display: flex;
          flex-grow: 1;
        }
      `}</style>
      <style jsx>{`
        nav {
          flex-direction: ${isDesktopView ? 'row' : 'column'};
        }
      `}</style>
    </nav>
  );
};

export default NavigationBar;
