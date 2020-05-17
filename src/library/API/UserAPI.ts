import Fixtures from '../Fixtures';
import { LoginData } from '../../store/User/Login/Types';

class UserAPI {
  private url: string;

  private useFixtures: boolean;

  constructor(useFixtures: boolean) {
    this.url = `${process.env.API_URL}/user`;
    this.useFixtures = useFixtures;
  }

  public login(loginData: LoginData) {
    if (this.useFixtures) {
      return Fixtures.UserFixtures.login();
    }

    return fetch(`${this.url}/login`, {
      method: 'post',
      body: JSON.stringify(loginData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}

export default UserAPI;
