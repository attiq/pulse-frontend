import { IOpportunity } from '../interfaces/IOpportunity';

export const GET_OPPORTUNITIES_DATA = 'GET_OPPORTUNITIES_DATA';
export const SEARCH_OPPORTUNITIES = 'SEARCH_OPPORTUNITIES';
export const OPPORTUNITY_ERRORS = 'OPPORTUNITY_ERRORS';

export const getOpportunitiesAction = (payload: IOpportunity[]) => {
  return { type: GET_OPPORTUNITIES_DATA, payload };
};

export const searchOpportunities = (searchTerm: string, data: IOpportunity[]) => {
  const payload = { searchTerm, data };
  return { type: SEARCH_OPPORTUNITIES, payload };
};

export const opportunityErrorAction = (errors: any) => {
  return { type: OPPORTUNITY_ERRORS, errors };
};
