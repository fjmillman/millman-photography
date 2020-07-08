/* eslint-disable react/jsx-props-no-spreading */
import { createContext, ReactNode } from 'react';

import useWindowWidth from '../hooks/useWindowWidth';

const DEFAULT_IS_DESKTOP_VIEW = false;

const PageContext = createContext({
  isDesktopView: DEFAULT_IS_DESKTOP_VIEW,
});

interface Props {
  children: ReactNode;
}

export const PageContextProvider = ({ children }: Props) => {
  const windowWidth = useWindowWidth();

  const isDesktopView = windowWidth >= 640;

  return (
    <PageContext.Provider value={{ isDesktopView }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageContext;
