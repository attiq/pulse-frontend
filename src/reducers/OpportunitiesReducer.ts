import { AnyAction } from 'redux';
import * as actionTypes from '../actions/OpportunitiesActions';
import { IOpportunity } from '../interfaces/IOpportunity';

export type State = {
  readonly opportunitiesData: IOpportunity[];
  readonly searchOpportunities: IOpportunity[];
  readonly opportunityErrors: any;
};

const initialState: State = {
  opportunitiesData: [],
  searchOpportunities: [],
  opportunityErrors: [],
};

const searchOpportunitiesByKeyword = (searchTerm: string, data: IOpportunity[]): IOpportunity[] => {
  if (!searchTerm) return data;
  const searchResults = data.filter((opp: IOpportunity) => {
    return (
      opp.procedure_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.doctor?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.doctor?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.patient?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.patient?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return searchResults;
};

export const OpportunitiesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.GET_OPPORTUNITIES_DATA: {
      return {
        ...state,
        opportunitiesData: action.payload,
      };
    }
    case actionTypes.SEARCH_OPPORTUNITIES: {
      const { searchTerm, data } = action.payload;
      const searchOpportunities = searchOpportunitiesByKeyword(searchTerm, data);
      return {
        ...state,
        searchOpportunities,
      };
    }
    case actionTypes.OPPORTUNITY_ERRORS: {
      return {
        ...state,
        opportunityErrors: action.errors,
      };
    }
    default:
      return state;
  }
};
