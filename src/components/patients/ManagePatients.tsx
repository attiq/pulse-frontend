import Navbar from '../common/Navbar';
import { useState, useEffect } from 'react';
import { Login } from '../users/login';
import dayjs from 'dayjs';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useStyles } from '../../styles/styles';
import { StageColumn } from './StageColumn';
import FormTextInput from '../common/FormTextInput';
import { MemberDialog } from './MemberDialog';
import { baseApi } from '../../services/BaseApi';
import { Alert } from '../common/Alert';
import { getAllOpportunities } from '../../services/OpportunitiesApi';
import { useDispatch, useSelector } from 'react-redux';
import { opportunityStages } from '../../constants/appConstants';
import { RootState } from '../../reducers';
import { searchOpportunities } from '../../actions/OpportunitiesActions';
import { IOpportunity } from '../../interfaces/IOpportunity';

export const ManagePatients = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const opportunitesData = useSelector((state: RootState) => state.opportunities.opportunitiesData);
  const searchedOpportunities = useSelector((state: RootState) => state.opportunities.searchOpportunities);
  const [opportunites, setOpportunites] = useState<IOpportunity[]>([]);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [openMemberDialog, setOpenMemberDialog] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [alert, setAlert] = useState<{ message: string; isShown: boolean }>();

  useEffect(() => {
    if (token) {
      baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(getAllOpportunities());
    }
  }, [dispatch, token]);

  useEffect(() => {
    setOpportunites(searchText !== '' ? searchedOpportunities : opportunitesData);
  }, [searchText, searchedOpportunities, opportunitesData]);

  const handleMemberDialog = () => {
    setOpenMemberDialog(!openMemberDialog);
  };

  const handleAlert = (message: string, isShown: boolean) => {
    setAlert({ message: message, isShown: isShown });
  };

  const onHandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.currentTarget.value;
    dispatch(searchOpportunities(searchTerm, opportunitesData));
    setSearchText(searchTerm);
  };

  const isExpired = (token: string) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    var dateNow = new Date();
    const { exp } = JSON.parse(jsonPayload);

    return Date.parse(dayjs(new Date(exp)).format('HH:MM')) > Date.parse(dayjs(dateNow).format('HH:MM'));
  };

  if (!token || isExpired(token)) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      {alert?.isShown && <Alert alert={alert} handleAlert={handleAlert} />}
      <Box className={`${classes.mainContent}`}>
        <Box className={`${classes.contentContainer} full-height`}>
          <Navbar />
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Typography variant='h2'>Patients</Typography>
            </Grid>
            <Grid item xs={1}>
              <Button variant='contained' color='primary' onClick={handleMemberDialog}>
                Add Member
              </Button>
            </Grid>
            <Grid item xs={2}>
              <FormTextInput placeholder='Search' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onHandleSearch(e)} />
            </Grid>
          </Grid>
          <Box mt={4} className={classes.opportunitiesBoard}>
            <Box className={classes.opportunitiesBoardInner}>
              {opportunityStages.map((stage: any, index: number) => (
                <StageColumn opportunites={opportunites} key={index} stage={stage} handleAlert={handleAlert} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {openMemberDialog && <MemberDialog isOpen={openMemberDialog} onClose={handleMemberDialog} handleAlert={handleAlert} />}
    </>
  );
};
