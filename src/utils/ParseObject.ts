import { opportunityStages } from '../constants/appConstants';
import { IOpportunity } from '../interfaces/IOpportunity';

export function sorteStageHistory(opportunity: IOpportunity) {
  return Object.keys(opportunity.stage_history).sort((a, b) => opportunityStages.indexOf(a) - opportunityStages.indexOf(b));
}

export function formateStageHistory(selectedStages: string[], opportunity: IOpportunity) {
  const stageHistory: any = {};
  // eslint-disable-next-line array-callback-return
  selectedStages.map((stage: string) => {
    stageHistory[stage] = opportunity.stage_history[stage];
  });

  return stageHistory;
}
