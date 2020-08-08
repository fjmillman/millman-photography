import { name as loginKey } from 'store/User/Login/Slice';
import { useThunkDispatch, useTypedSelector } from 'store';
import { logout } from 'store/User/Login/Effects';

const useAuthentication = () => {
  const { isLoggedIn } = useTypedSelector((state) => state[loginKey]);

  const dispatch = useThunkDispatch();

  const handleLogout = () => dispatch(logout());

  return {
    state: { isLoggedIn },
    actions: { handleLogout },
  };
};

export default useAuthentication;
