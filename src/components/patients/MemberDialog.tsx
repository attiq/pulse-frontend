import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, MenuItem, Select, SelectChangeEvent, Stack, Avatar, Typography } from '@mui/material';
import { useStyles } from '../../styles/styles';
import { useEffect, useState } from 'react';
import { memberGenderOptions, memberRoleOptions, memberValidations } from '../../constants/appConstants';
import { useForm } from 'react-hook-form';
import { clearErros, formateAPIErros, formateFormErros, getmembervatarPreview } from '../../helpers/Helpers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { FormAlert } from '../common/FormAlert';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormDatepicker from '../common/FormDatepicker';
import { saveMember } from '../../services/MembersApi';
import { memberErrorAction } from '../../actions/MembersActions';

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

export const MemberDialog = (props: any) => {
  const { isOpen, onClose, handleAlert } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const memberApiErrors = useSelector((state: RootState) => state.members.memberErrors);
  const [formErrors, setFormErrors] = useState<any>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedDob, setSelectedDob] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  const { register, trigger, setValue, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
  });

  const registerOptions = {
    first_name: { required: memberValidations.FIRST_NAME },
    last_name: { required: memberValidations.LAST_NAME },
    role: { required: memberValidations.ROLE },
    gender: { required: memberValidations.GENDER },
    dob: { required: memberValidations.DOB },
  };

  useEffect(() => {
    if (memberApiErrors?.length > 0) {
      formateAPIErros(memberApiErrors, formErrors, setFormErrors);
      dispatch(memberErrorAction([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, memberApiErrors]);

  useEffect(() => {
    formateFormErros(formState, formErrors, setFormErrors, reset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  const handleInput = (event: any, error: string) => {
    clearErros(formErrors, setFormErrors, event.target.value !== '', error);
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setValue('role', value);
    setSelectedRole(value);
    trigger('role');
    clearErros(formErrors, setFormErrors, true, memberValidations.ROLE);
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setValue('gender', value);
    setSelectedGender(value);
    trigger('gender');
    clearErros(formErrors, setFormErrors, true, memberValidations.GENDER);
  };

  const handleDobChange = (value: any) => {
    const dob = value.format('MM/DD/YYYY');
    setSelectedDob(dob);
    setValue('dob', dob);
    trigger('dob');
    clearErros(formErrors, setFormErrors, true, memberValidations.DOB);
  };

  const handleUploads = (event: any) => {
    const file = event.target.files[0];
    setSelectedAvatar(file);
    setAvatarUrl(URL.createObjectURL(file));
  };

  const handleSave = (data: any) => {
    const formData = new FormData();
    formData.append('member[first_name]', data.first_name);
    formData.append('member[last_name]', data.last_name);
    formData.append('member[role]', data.role);
    formData.append('member[gender]', data.gender);
    formData.append('member[dob]', data.dob);
    formData.append('member[avatar]', selectedAvatar);

    dispatch(saveMember(formData, onClose, handleAlert));
  };

  return (
    <>
      <input {...register('role', registerOptions.role)} name='role' type='text' className='hidden' />
      <input {...register('gender', registerOptions.gender)} name='gender' type='text' className='hidden' />
      <input {...register('dob', registerOptions.dob)} name='dob' type='text' className='hidden' />

      <Dialog open={isOpen} onClose={onClose} aria-labelledby='dialog-title' aria-describedby='dialog-description' maxWidth='md' fullWidth={true}>
        <DialogTitle sx={{ borderBottom: '1px solid #d1dbe3' }} id='dialog-title'>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant='h4'>Add Member</Typography>
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
                <Stack direction='row' alignItems='center' spacing={2} className={classes.memberUploadImage}>
                  <Avatar src={getmembervatarPreview(avatarUrl)} className={classes.memberAvatarPreview} sx={{ width: 76, height: 76 }}></Avatar>
                  <Button variant='contained' component='label'>
                    Click to upload image
                    <input hidden accept='image/*' type='file' onChange={handleUploads} />
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formTextInput}>
                  <Typography variant='body1'>First Name*</Typography>
                  <input
                    {...register('first_name', registerOptions.first_name)}
                    name='first_name'
                    type='text'
                    placeholder='Enter First Name'
                    className={formErrors?.filter((e: string) => e === memberValidations.FIRST_NAME).length > 0 ? `${classes.formTextInputField} invalid` : classes.formTextInputField}
                    onKeyUp={(e) => handleInput(e, formErrors?.filter((e: string) => e === memberValidations.FIRST_NAME)[0])}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formTextInput}>
                  <Typography variant='body1'>Last Name*</Typography>
                  <input
                    {...register('last_name', registerOptions.last_name)}
                    name='last_name'
                    type='text'
                    placeholder='Enter Last Name'
                    className={formErrors?.filter((e: string) => e === memberValidations.LAST_NAME).length > 0 ? `${classes.formTextInputField} invalid` : classes.formTextInputField}
                    onKeyUp={(e) => handleInput(e, formErrors?.filter((e: string) => e === memberValidations.LAST_NAME)[0])}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth className={formErrors?.find((e: string) => e === memberValidations.ROLE) ? `${classes.formSelectInValid}` : `${classes.formSelectInput} no-label`}>
                  <Typography variant='body1'>Role*</Typography>
                  <Select
                    fullWidth
                    MenuProps={MenuProps}
                    value={selectedRole}
                    onChange={handleRoleChange}
                    displayEmpty
                    IconComponent={ArrowDropDownIcon}
                    sx={{
                      '& .MuiSelect-select .notranslate::after': {
                        content: `"Select Role"`,
                        opacity: 0.42,
                      },
                    }}
                  >
                    {memberRoleOptions.map((role: any, index: number) => (
                      <MenuItem className={classes.selected} value={role.value} key={index}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth className={formErrors?.find((e: string) => e === memberValidations.GENDER) ? `${classes.formSelectInValid}` : `${classes.formSelectInput} no-label`}>
                  <Typography variant='body1'>Gender*</Typography>
                  <Select
                    fullWidth
                    MenuProps={MenuProps}
                    value={selectedGender}
                    onChange={handleGenderChange}
                    displayEmpty
                    IconComponent={ArrowDropDownIcon}
                    sx={{
                      '& .MuiSelect-select .notranslate::after': {
                        content: `"Select Gender"`,
                        opacity: 0.42,
                      },
                    }}
                  >
                    {memberGenderOptions.map((gender: any, index: number) => (
                      <MenuItem className={classes.selected} value={gender.value} key={index}>
                        {gender.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormDatepicker label={'Date of Birth*'} value={selectedDob} onChangeHandler={handleDobChange} inValid={formErrors?.find((e: string) => e === memberValidations.DOB)} />
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent='right' alignItems='right'>
            <Button variant='contained' color='primary' onClick={handleSubmit(handleSave)}>
              Save
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};
