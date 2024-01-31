import { AnyAction } from 'redux';
import * as actionTypes from '../actions/MembersActions';
import { IMember } from '../interfaces/IMember';

export type State = {
  readonly membersData: IMember[];
  readonly memberErrors: any;
};

const initialState: State = {
  membersData: [],
  memberErrors: [],
};

export const MembersReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.GET_MEMBERS_DATA: {
      return {
        ...state,
        membersData: action.payload,
      };
    }
    case actionTypes.MEMBER_ERRORS: {
      return {
        ...state,
        memberErrors: action.errors,
      };
    }
    default:
      return state;
  }
};
