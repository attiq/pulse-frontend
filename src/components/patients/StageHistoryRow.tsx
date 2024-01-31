import { Grid, IconButton, Stack, Typography, capitalize } from '@mui/material';
import { useState } from 'react';
import { convertTimeZone } from '../../helpers/Helpers';
import TrashIcon from '../../assets/images/icon_trash.svg';
import TrashIconActive from '../../assets/images/icon_trash_active.svg';

export const StageHistoryRow = (props: any) => {
  const { stage, opportunity, selectedStages, setSelectedStages } = props;
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const [isHoverTrash, setIsHoverTrash] = useState(false);

  const handleRemove = () => {
    setSelectedStages(selectedStages.filter((selectedStage: string) => selectedStage !== stage));
  };

  return (
    <>
      <Stack direction={'row'}>
        <Grid item xs={4}>
          <Typography variant='body1'>{`${capitalize(stage)}`}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant='body1'>{`${convertTimeZone(`${opportunity.stage_history[stage]}`, timeZone)}`}</Typography>
        </Grid>
        <Grid item xs={2}>
          {stage !== 'leads' && (
            <IconButton disableRipple onMouseEnter={() => setIsHoverTrash(true)} onMouseLeave={() => setIsHoverTrash(false)} onClick={handleRemove}>
              <img src={isHoverTrash ? TrashIconActive : TrashIcon} alt='Remove' />
            </IconButton>
          )}
        </Grid>
      </Stack>
    </>
  );
};
