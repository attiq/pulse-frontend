import { Dispatch } from 'redux';
import { baseApi } from './BaseApi';
import { getMembersAction, memberErrorAction } from '../actions/MembersActions';

export const getAllMembers = () => async (dispatch: Dispatch) => {
  try {
    const response = await baseApi.get('/members');
    if (response.data) {
      dispatch(getMembersAction(response.data));
    }
  } catch (error: any) {
    dispatch(memberErrorAction([error.response.data]));
  }
};

export const saveMember = (data: any, onClose: any, handleAlert: any) => async (dispatch: Dispatch) => {
  try {
    const response = await baseApi.post('/members', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    if (response.data) {
      handleAlert('Member saved successfully', true);
      onClose();
    }
  } catch (error: any) {
    dispatch(memberErrorAction([error.response.data]));
  }
};
