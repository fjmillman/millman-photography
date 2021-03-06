import { LoginData } from 'store/User/Login/Types';
import { UserFixtures } from '../Fixtures';

const UserAPI = (useFixtures: boolean) => {
  const getUrl = () => 'api/user';

  const login = (loginData: LoginData) => {
    if (useFixtures) {
      return UserFixtures.login(loginData);
    }

    return fetch(`${getUrl()}/login`, {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const check = () => {
    if (useFixtures) {
      return UserFixtures.check();
    }

    return fetch(`${getUrl()}/check`, {
      method: 'GET',
    });
  };

  const logout = () => {
    if (useFixtures) {
      return UserFixtures.logout();
    }

    return fetch(`${getUrl()}/logout`, {
      method: 'GET',
    });
  };

  return {
    login,
    check,
    logout,
  };
};

export default UserAPI;
