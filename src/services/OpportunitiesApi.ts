import { Dispatch } from 'redux';
import { baseApi } from './BaseApi';
import { getOpportunitiesAction, opportunityErrorAction } from '../actions/OpportunitiesActions';
import { IOpportunity } from '../interfaces/IOpportunity';

export const getAllOpportunities = () => async (dispatch: Dispatch) => {
  try {
    const response = await baseApi.get('/opportunities');
    if (response.data) {
      dispatch(getOpportunitiesAction(response.data));
    }
  } catch (error: any) {
    dispatch(opportunityErrorAction([error.response.data]));
  }
};

export const createOpportunity = (data: Partial<IOpportunity>, onClose: any, handleAlert: any) => async (dispatch: Dispatch) => {
  try {
    await baseApi.post('/opportunities', { opportunity: data });
    const response = await baseApi.get('/opportunities');
    if (response.data) {
      dispatch(getOpportunitiesAction(response.data));
      handleAlert('Opportunity saved successfully', true);
      onClose();
    }
  } catch (error: any) {
    dispatch(opportunityErrorAction([error.response.data]));
  }
};

export const updateOpportunity = (data: Partial<IOpportunity>, onClose: any, handleAlert: any) => async (dispatch: Dispatch) => {
  try {
    await baseApi.patch(`/opportunities/${data.id}`, { opportunity: data });
    const response = await baseApi.get('/opportunities');
    if (response.data) {
      dispatch(getOpportunitiesAction(response.data));
      handleAlert('Opportunity saved successfully', true);
      onClose();
    }
  } catch (error: any) {
    dispatch(opportunityErrorAction([error.response.data]));
  }
};

export const updateOpportunityStage = (data: Partial<IOpportunity>) => async (dispatch: Dispatch) => {
  try {
    await baseApi.patch(`/opportunities/${data.id}`, { opportunity: data });
    const response = await baseApi.get('/opportunities');
    if (response.data) {
      dispatch(getOpportunitiesAction(response.data));
    }
  } catch (error: any) {
    dispatch(opportunityErrorAction([error.response.data]));
  }
};
