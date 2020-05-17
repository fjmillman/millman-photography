import UserAPI from './UserAPI';

class API {
  private userAPI: UserAPI;

  constructor(useFixtures: boolean) {
    this.userAPI = new UserAPI(useFixtures);
  }

  public getUserAPI() {
    return this.userAPI;
  }
}

const api = new API(process.env.USE_FIXTURES !== undefined);

export type APIType = typeof api;

export default api;
