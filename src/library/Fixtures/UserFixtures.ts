import { promiseWrap, responseWrap } from '../utils';

const testUser = {
  id: 1,
  firstName: 'Test',
  lastName: 'User',
  emailAddress: 'test.user@millmanphotography.co.uk',
};

type User = typeof testUser;

const login = () => promiseWrap<Response>(responseWrap<User>(testUser));

export default {
  login,
};
