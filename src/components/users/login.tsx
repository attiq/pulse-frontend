import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Typography } from '@mui/material';
import { useStyles } from '../../styles/styles';
import { useEffect, useState } from 'react';
import { userValidations } from '../../constants/appConstants';
import { useForm } from 'react-hook-form';
import { clearErros, formateAPIErros, formateFormErros } from '../../helpers/Helpers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { userErrorAction } from '../../actions/UsersActions';
import { FormAlert } from '../common/FormAlert';
import { loginUser } from '../../services/UserApi';

export const Login = (props: any) => {
  const { setToken } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const userApiErrors = useSelector((state: RootState) => state.users.userErrors);
  const [formErrors, setFormErrors] = useState<any>([]);

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
  });

  const registerOptions = {
    email: { required: userValidations.EMAIL },
    password: { required: userValidations.PASSWORD },
  };

  useEffect(() => {
    if (userApiErrors?.length > 0) {
      formateAPIErros(userApiErrors, formErrors, setFormErrors);
      dispatch(userErrorAction([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userApiErrors]);

  useEffect(() => {
    formateFormErros(formState, formErrors, setFormErrors, reset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  const handleInput = (event: any, error: string) => {
    clearErros(formErrors, setFormErrors, event.target.value !== '', error);
  };

  const handleLogin = (data: any) => {
    dispatch(loginUser(data, setToken));
  };

  return (
    <>
      <Dialog open={true} aria-labelledby='dialog-title' aria-describedby='dialog-description' maxWidth='md' fullWidth={true}>
        <DialogTitle sx={{ borderBottom: '1px solid #d1dbe3' }} id='dialog-title'>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant='h4'>Login</Typography>
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
                    {...register('email', registerOptions.email)}
                    name='email'
                    type='text'
                    placeholder='Enter Email*'
                    className={formErrors?.filter((e: string) => e === userValidations.EMAIL).length > 0 ? `${classes.formTextInputField} invalid` : classes.formTextInputField}
                    onKeyUp={(e) => handleInput(e, formErrors?.filter((e: string) => e === userValidations.EMAIL)[0])}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} mt={1}>
                <FormControl fullWidth className={classes.formTextInput}>
                  <input
                    {...register('password', registerOptions.password)}
                    name='password'
                    type='password'
                    placeholder='Enter Password*'
                    className={formErrors?.filter((e: string) => e === userValidations.PASSWORD).length > 0 ? `${classes.formTextInputField} invalid` : classes.formTextInputField}
                    onKeyUp={(e) => handleInput(e, formErrors?.filter((e: string) => e === userValidations.PASSWORD)[0])}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent='right' alignItems='right'>
            <Button variant='contained' color='primary' onClick={handleSubmit(handleLogin)}>
              Login
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};
