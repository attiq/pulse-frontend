import { IMember } from "../interfaces/IMember";

export const GET_MEMBERS_DATA = 'GET_MEMBERS_DATA';
export const MEMBER_ERRORS = 'MEMBER_ERRORS';

export const getMembersAction = (payload: IMember[]) => {
  return { type: GET_MEMBERS_DATA, payload };
};

export const memberErrorAction = (errors: any) => {
  return { type: MEMBER_ERRORS, errors };
};
