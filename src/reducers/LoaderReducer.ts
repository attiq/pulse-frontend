import { AnyAction } from 'redux';
import * as actionTypes from '../actions/LoaderActions';

export type State = {
  readonly loading: boolean;
  readonly taxonomyLoading: boolean;
  readonly saveLoading: boolean;
};

const initialState: State = {
  loading: false,
  taxonomyLoading: false,
  saveLoading: false,
};

export const LoaderReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case actionTypes.SET_TAXONOMY_LOADING: {
      return {
        ...state,
        taxonomyLoading: action.payload,
      };
    }
    case actionTypes.SET_SAVE_LOADING: {
      return {
        ...state,
        saveLoading: action.payload,
      };
    }
    default:
      return state;
  }
};
