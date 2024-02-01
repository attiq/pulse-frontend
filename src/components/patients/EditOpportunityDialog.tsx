import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useStyles } from '../../styles/styles';
import { useEffect, useState } from 'react';
import { opportunityValidations } from '../../constants/appConstants';
import { useForm } from 'react-hook-form';
import { clearErros, formateAPIErros, formateFormErros } from '../../helpers/Helpers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { FormAlert } from '../common/FormAlert';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getAllMembers } from '../../services/MembersApi';
import { IMember } from '../../interfaces/IMember';
import { opportunityErrorAction } from '../../actions/OpportunitiesActions';
import { updateOpportunity } from '../../services/OpportunitiesApi';
import { IOpportunity } from '../../interfaces/IOpportunity';
import { formateStageHistory, sorteStageHistory } from '../../utils/ParseObject';
import { StageHistoryRow } from './StageHistoryRow';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const EditOpportunityDialog = (props: any) => {
  const { isOpen, onClose, opportunity, handleAlert } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const members = useSelector((state: RootState) => state.members.membersData);
  const opportunityApiErrors = useSelector((state: RootState) => state.opportunities.opportunityErrors);
  const [formErrors, setFormErrors] = useState<any>([]);
  const [avaiableDoctors, setAvaiableDoctors] = useState<IMember[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedStages, setSelectedStages] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getAllMembers());
  }, [dispatch]);

  const { register, trigger, setValue, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (opportunity?.doctor_id) {
      setValue('doctor_id', opportunity.doctor_id);
      setSelectedDoctor(opportunity.doctor_id);
    }
    if (opportunity?.stage_history) {
      setSelectedStages(sorteStageHistory(opportunity));
    }
  }, [opportunity, setValue]);

  useEffect(() => {
    if (members?.length > 0) {
      setAvaiableDoctors(members.filter((member: IMember) => member.role === 'doctor'));
    }
  }, [members]);

  const registerOptions = {
    procedure_name: { required: opportunityValidations.PROCEDURE },
    doctor_id: { required: opportunityValidations.DOCTOR },
  };

  useEffect(() => {
    if (opportunityApiErrors?.length > 0) {
      formateAPIErros(opportunityApiErrors, formErrors, setFormErrors);
      dispatch(opportunityErrorAction([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, opportunityApiErrors]);

  useEffect(() => {
    formateFormErros(formState, formErrors, setFormErrors, reset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  const handleInput = (event: any, error: string) => {
    clearErros(formErrors, setFormErrors, event.target.value !== '', error);
  };

  const handleDoctorChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setValue('doctor_id', value);
    setSelectedDoctor(value);
    trigger('doctor_id');
    clearErros(formErrors, setFormErrors, true, opportunityValidations.DOCTOR);
  };

  const handleUpdateOpportunity = (data: Partial<IOpportunity>) => {
    const dataToSave: Partial<IOpportunity> = {
      id: opportunity.id,
      procedure_name: data.procedure_name,
      doctor_id: data.doctor_id,
      stage_history: formateStageHistory(selectedStages, opportunity),
    };

    dispatch(updateOpportunity(dataToSave, onClose, handleAlert));
  };

  return (
    <>
      <input {...register('doctor_id', registerOptions.doctor_id)} name='doctor_id' type='text' className='hidden' />

      <Dialog open={isOpen} onClose={onClose} aria-labelledby='dialog-title' aria-describedby='dialog-description' maxWidth='md' fullWidth={true}>
        <DialogTitle sx={{ borderBottom: '1px solid #d1dbe3' }} id='dialog-title'>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant='h4'>Edit Opportunity</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <>
            <Grid container spacing={4} mt={0} mb={2}>
              {formErrors?.length > 0 && (
                <Grid item xs={12} mb={1}>
                  <FormAlert errors={formErrors} />
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formTextInput}>
                  <input
                    {...register('procedure_name', registerOptions.procedure_name)}
                    name='procedure_name'
                    type='text'
                    defaultValue={opportunity?.procedure_name}
                    placeholder='Procedure*'
                    className={formErrors?.filter((e: string) => e === opportunityValidations.PROCEDURE).length > 0 ? `${classes.formTextInputField} invalid` : classes.formTextInputField}
                    onKeyUp={(e) => handleInput(e, formErrors?.filter((e: string) => e === opportunityValidations.PROCEDURE)[0])}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth className={formErrors?.find((e: string) => e === opportunityValidations.DOCTOR) ? `${classes.formSelectInValid}` : `${classes.formSelectInput} no-label`}>
                  <Select
                    fullWidth
                    MenuProps={MenuProps}
                    value={selectedDoctor}
                    onChange={handleDoctorChange}
                    displayEmpty
                    IconComponent={ArrowDropDownIcon}
                    sx={{
                      '& .MuiSelect-select .notranslate::after': {
                        content: `"Doctor*"`,
                        opacity: 0.42,
                      },
                    }}
                  >
                    {avaiableDoctors.map((doctor: any, index: number) => (
                      <MenuItem className={classes.selected} value={doctor.id} key={index}>
                        {`${doctor.first_name} ${doctor.last_name}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h5' mb={1}>Stage History</Typography>
                {selectedStages.map((stage: string, index: number) => (
                  <StageHistoryRow stage={stage} opportunity={opportunity} selectedStages={selectedStages} setSelectedStages={setSelectedStages} />
                ))}
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent='right' alignItems='right'>
            <Button variant='contained' color='primary' onClick={handleSubmit(handleUpdateOpportunity)}>
              Update
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};
