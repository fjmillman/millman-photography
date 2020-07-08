import { promiseWrap, responseWrap, errorResponseWrap } from '../utils';
import { LoginData } from '../../store/User/Login/Types';

let isLoggedIn = false;

const testUser = {
  id: 1,
  firstName: 'Test',
  lastName: 'User',
  email: 'test.user@millmanphotography.co.uk',
  password: 'abc123',
};

const login = ({ email, password }: LoginData) => {
  if (email !== testUser.email || password !== testUser.password) {
    return promiseWrap<Response>(errorResponseWrap('Oops! Login failed'));
  }

  isLoggedIn = true;
  return promiseWrap<Response>(responseWrap());
};

const check = () =>
  promiseWrap<Response>(
    isLoggedIn ? responseWrap() : errorResponseWrap('User is not logged in!')
  );

const logout = () => {
  isLoggedIn = false;
  return promiseWrap<Response>(responseWrap());
};

export default {
  login,
  check,
  logout,
};
