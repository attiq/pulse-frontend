import { AnyAction } from 'redux';
import * as actionTypes from '../actions/UsersActions';
import { IUser } from '../interfaces/IUser';

export type State = {
  readonly currentUser: Partial<IUser>;
  readonly userErrors: any;
};

const initialState: State = {
  currentUser: {} as Partial<IUser>,
  userErrors: [],
};

export const UsersReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case actionTypes.USER_ERROR: {
      return {
        ...state,
        userErrors: action.errors,
      };
    }
    default:
      return state;
  }
};
