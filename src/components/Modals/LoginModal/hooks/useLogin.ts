import { useTypedSelector, useThunkDispatch } from '../../../../store';
import { login } from '../../../../store/User/Login/Effects';
import { LoginData } from '../../../../store/User/Login/Types';

const useLogin = () => {
  const { isFetching, error, isLoggedIn } = useTypedSelector(
    (state) => state.login
  );

  const dispatch = useThunkDispatch();

  const handleLogin = (loginData: LoginData) => dispatch(login(loginData));

  return {
    state: { isFetching, error, isLoggedIn },
    actions: { handleLogin },
  };
};

export default useLogin;
