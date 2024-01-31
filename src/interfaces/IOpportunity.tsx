import { IStageHistory } from './IStageHistory';

export interface IOpportunity {
  id?: string | undefined;
  procedure_name?: string | undefined;
  doctor_id?: string | undefined;
  patient_id?: string | undefined;
  stage_history: IStageHistory;

  [key: string]: any;
}
