import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { check } from 'store/User/Login/Effects';
import useHasMounted from './useHasMounted';

const useStartup = () => {
  const hasMounted = useHasMounted();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  return { hasMounted };
};

export default useStartup;
