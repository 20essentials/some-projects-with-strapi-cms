import { loginUserAction } from './login';
import { registerUser } from './signup';

export const actions = {
  auth: {
    registerUser,
    loginUserAction,
  }
};
