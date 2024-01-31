import { useState } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography, Stack, IconButton, capitalize } from '@mui/material';
import { useStyles } from '../../styles/styles';
import { profileAvatar, getMemberShortName, convertTimeZone } from '../../helpers/Helpers';
import EditIcon from '../../assets/images/icon_edit.svg';
import EditIconActive from '../../assets/images/icon_edit_active.svg';
import NextIcon from '../../assets/images/icon_next.svg';
import NextIconActive from '../../assets/images/icon_next_active.svg';
import { useDispatch } from 'react-redux';
import { IOpportunity } from '../../interfaces/IOpportunity';
import { opportunityStages } from '../../constants/appConstants';
import { updateOpportunityStage } from '../../services/OpportunitiesApi';
import { sorteStageHistory } from '../../utils/ParseObject';
import { EditOpportunityDialog } from './EditOpportunityDialog';

export const OpportunityCard = ({ ...props }) => {
  const { key, opportunity, stage, handleAlert } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const [isHoverEdit, setIsHoverEdit] = useState(false);
  const [isHoverNext, setIsHoverNext] = useState(false);
  const [editOpportunityDialog, setEditOpportunityDialog] = useState(false);

  const handleNext = () => {
    const nextStage = opportunityStages[opportunityStages.indexOf(stage) + 1];

    const dataToSave: Partial<IOpportunity> = {
      id: opportunity.id,
      stage: nextStage,
    };

    dispatch(updateOpportunityStage(dataToSave));
  };

  const handleEditOpportunityDialog = () => {
    setEditOpportunityDialog(!editOpportunityDialog);
  };

  return (
    <>
      <Card className={classes.profileCard} key={key}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={2}>
              <Avatar src={profileAvatar(opportunity.patient.avatar_url)} className={classes.profileCardAvatar} sx={{ width: 56, height: 56 }}>
                {getMemberShortName([opportunity.patient.first_name, opportunity.patient.last_name])}
              </Avatar>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.profileCardName} variant='h4'>
                {`${opportunity.patient.first_name} ${opportunity.patient.last_name}`}
              </Typography>
              <Typography className={classes.profileCardTitle}>
                <span>{`${capitalize(opportunity.patient.gender)}, ${opportunity.patient.age} years old`}</span>
              </Typography>
            </Grid>
          </Grid>

          <Box className={classes.profileCardDetails}>
            <Grid container spacing={4}>
              <Grid item xs={9}>
                <Typography className={classes.profileCardProcedure}>{opportunity.procedure_name}</Typography>
                <Typography className={classes.profileCardProcedure}>{`Dr. ${opportunity.doctor.first_name} ${opportunity.doctor.last_name}`}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Avatar src={profileAvatar(opportunity.doctor.avatar_url)} className={classes.profileCardDoctorAvatar} sx={{ width: 36, height: 36 }}>
                  {getMemberShortName([opportunity.doctor.first_name, opportunity.doctor.last_name])}
                </Avatar>
              </Grid>

              <Grid item xs={9}>
                {sorteStageHistory(opportunity).map((stage: string, index: number) => (
                  <Stack direction={'row'} key={index}>
                    <Typography className={classes.profileCardStage}>{`${capitalize(stage)}`}</Typography>
                    <Typography className={classes.profileCardStageDate}>{`${convertTimeZone(`${opportunity.stage_history[stage]}`, timeZone)}`}</Typography>
                  </Stack>
                ))}
              </Grid>

              <Grid item xs={2}>
                <Box>
                  <Stack direction={'column'}>
                    {stage !== 'treated' && (
                      <IconButton disableRipple onMouseEnter={() => setIsHoverNext(true)} onMouseLeave={() => setIsHoverNext(false)} onClick={handleNext}>
                        <img src={isHoverNext ? NextIconActive : NextIcon} alt='Remove' />
                      </IconButton>
                    )}
                    <IconButton disableRipple onMouseEnter={() => setIsHoverEdit(true)} onMouseLeave={() => setIsHoverEdit(false)} onClick={handleEditOpportunityDialog}>
                      <img src={isHoverEdit ? EditIconActive : EditIcon} alt='Edit' />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {editOpportunityDialog && <EditOpportunityDialog isOpen={editOpportunityDialog} onClose={handleEditOpportunityDialog} opportunity={opportunity} handleAlert={handleAlert} />}
    </>
  );
};
