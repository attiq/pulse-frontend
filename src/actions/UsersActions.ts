import { IUser } from '../interfaces/IUser';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const USER_ERROR = 'USER_ERROR';

export const setCurrentUserAction = (payload: Partial<IUser>) => {
  return { type: SET_CURRENT_USER, payload };
};

export const userErrorAction = (errors: any) => {
  return { type: USER_ERROR, errors };
};
