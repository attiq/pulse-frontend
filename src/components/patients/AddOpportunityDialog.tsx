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
import { createOpportunity } from '../../services/OpportunitiesApi';
import { IOpportunity } from '../../interfaces/IOpportunity';

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

export const AddOpportunityDialog = (props: any) => {
  const { isOpen, onClose, handleAlert } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const members = useSelector((state: RootState) => state.members.membersData);
  const opportunityApiErrors = useSelector((state: RootState) => state.opportunities.opportunityErrors);
  const [formErrors, setFormErrors] = useState<any>([]);
  const [avaiableDoctors, setAvaiableDoctors] = useState<IMember[]>([]);
  const [avaiablePatients, setAvaiablePatients] = useState<IMember[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<string>('');

  useEffect(() => {
    dispatch(getAllMembers());
  }, [dispatch]);

  useEffect(() => {
    if (members?.length > 0) {
      setAvaiableDoctors(members.filter((member: IMember) => member.role === 'doctor'));
      setAvaiablePatients(members.filter((member: IMember) => member.role === 'patient'));
    }
  }, [members]);

  const { register, trigger, setValue, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
  });

  const registerOptions = {
    procedure_name: { required: opportunityValidations.PROCEDURE },
    doctor_id: { required: opportunityValidations.DOCTOR },
    patient_id: { required: opportunityValidations.PATIENT },
  };

  useEffect(() => {
    if (opportunityApiErrors?.length > 0) {
      formateAPIErros(opportunityApiErrors, formErrors, setFormErrors);
      dispatch(opportunityErrorAction([]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opportunityApiErrors]);

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

  const handlePatientChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setValue('patient_id', value);
    setSelectedPatient(value);
    trigger('patient_id');
    clearErros(formErrors, setFormErrors, true, opportunityValidations.PATIENT);
  };

  const handleSaveOpportunity = (data: Partial<IOpportunity>) => {
    const dataToSave: Partial<IOpportunity> = {
      ...data,
      stage: 'leads',
    };
    dispatch(createOpportunity(dataToSave, onClose, handleAlert));
  };

  return (
    <>
      <input {...register('doctor_id', registerOptions.doctor_id)} name='doctor_id' type='text' className='hidden' />
      <input {...register('patient_id', registerOptions.patient_id)} name='patient_id' type='text' className='hidden' />

      <Dialog open={isOpen} onClose={onClose} aria-labelledby='dialog-title' aria-describedby='dialog-description' maxWidth='md' fullWidth={true}>
        <DialogTitle sx={{ borderBottom: '1px solid #d1dbe3' }} id='dialog-title'>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant='h4'>Add Opportunity</Typography>
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
                  <Typography variant='body1'>Procedure*</Typography>
                  <input
                    {...register('procedure_name', registerOptions.procedure_name)}
                    name='procedure_name'
                    type='text'
                    placeholder='Enter Procedure'
                    className={formErrors?.filter((e: string) => e === opportunityValidations.PROCEDURE).length > 0 ? `${classes.formTextInputField} invalid` : classes.formTextInputField}
                    onKeyUp={(e) => handleInput(e, formErrors?.filter((e: string) => e === opportunityValidations.PROCEDURE)[0])}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth className={formErrors?.find((e: string) => e === opportunityValidations.DOCTOR) ? `${classes.formSelectInValid}` : `${classes.formSelectInput} no-label`}>
                  <Typography variant='body1'>Doctor*</Typography>
                  <Select
                    fullWidth
                    MenuProps={MenuProps}
                    value={selectedDoctor}
                    onChange={handleDoctorChange}
                    displayEmpty
                    IconComponent={ArrowDropDownIcon}
                    sx={{
                      '& .MuiSelect-select .notranslate::after': {
                        content: `"Select Doctor"`,
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
                <FormControl fullWidth className={formErrors?.find((e: string) => e === opportunityValidations.PATIENT) ? `${classes.formSelectInValid}` : `${classes.formSelectInput} no-label`}>
                  <Typography variant='body1'>Patient*</Typography>
                  <Select
                    fullWidth
                    MenuProps={MenuProps}
                    value={selectedPatient}
                    onChange={handlePatientChange}
                    displayEmpty
                    IconComponent={ArrowDropDownIcon}
                    sx={{
                      '& .MuiSelect-select .notranslate::after': {
                        content: `"Select Patient"`,
                        opacity: 0.42,
                      },
                    }}
                  >
                    {avaiablePatients.map((patient: any, index: number) => (
                      <MenuItem className={classes.selected} value={patient.id} key={index}>
                        {`${patient.first_name} ${patient.last_name}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent='right' alignItems='right'>
            <Button variant='contained' color='primary' onClick={handleSubmit(handleSaveOpportunity)}>
              Save
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};
