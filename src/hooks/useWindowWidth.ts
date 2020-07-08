import { useEffect, useState } from 'react';
import useWindowEvent from './useWindowEvent';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    handleWindowResize();
  }, []);

  useWindowEvent('resize', handleWindowResize);

  return windowWidth;
};

export default useWindowWidth;
