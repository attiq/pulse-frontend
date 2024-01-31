import { combineReducers } from 'redux';
import { LoaderReducer, State as LoaderState } from './LoaderReducer';
import { UsersReducer, State as UsersState } from './UsersReducer';
import { MembersReducer, State as MembersState } from './MembersReducer';
import { OpportunitiesReducer, State as OpportunitiesState } from './OpportunitiesReducer';

export interface RootState {
  loader: LoaderState;
  users: UsersState;
  members: MembersState;
  opportunities: OpportunitiesState;
}

export const rootReducer = combineReducers<RootState>({
  loader: LoaderReducer,
  users: UsersReducer,
  members: MembersReducer,
  opportunities: OpportunitiesReducer,
});
