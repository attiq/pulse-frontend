import { Dispatch } from 'redux';
import { baseApi } from './BaseApi';
import { setCurrentUserAction, userErrorAction } from '../actions/UsersActions';

export const loginUser = (data: any, setToken: any) => async (dispatch: Dispatch) => {
  try {
    const response = await baseApi.post('/login', { user: data });
    dispatch(setCurrentUserAction(response.data.status.data.user));
    sessionStorage.setItem('token', response.headers.authorization);
    setToken(response.headers.authorization);
  } catch (error: any) {
    console.log(error.response.data);

    dispatch(userErrorAction([error.response.data]));
  }
};

export const logoutUser = (setToken: any) => async (dispatch: Dispatch) => {
  try {
    await baseApi.delete('/logout');
    sessionStorage.removeItem('token');
    setToken(null)
  } catch (error: any) {
    console.log(error.response.data);

    dispatch(userErrorAction([error.response.data]));
  }
};
