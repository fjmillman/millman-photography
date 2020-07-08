import { combineReducers } from '@reduxjs/toolkit';

import loginReducer, { name as loginKey } from './User/Login/Slice';
import blogReducer, { name as blogKey } from './Blog/Slice';
import galleriesReducer, { name as galleriesKey } from './Galleries/Slice';

const rootReducer = combineReducers({
  [loginKey]: loginReducer,
  [blogKey]: blogReducer,
  [galleriesKey]: galleriesReducer,
});

export default rootReducer;
