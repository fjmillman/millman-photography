import { getApiUrl } from '../constants';
import { UserFixtures } from '../Fixtures';
import { LoginData } from '../../store/User/Login/Types';

const UserAPI = (useFixtures: boolean) => {
  const getUrl = () => `${getApiUrl()}/user`;

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
