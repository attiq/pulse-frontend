import { Box, Button, Typography, capitalize } from '@mui/material';
import { useStyles } from '../../styles/styles';
import { OpportunityCard } from './OpportunityCard';
import { useEffect, useState } from 'react';
import { AddOpportunityDialog } from './AddOpportunityDialog';
import { IOpportunity } from '../../interfaces/IOpportunity';
import { sorteStageHistory } from '../../utils/ParseObject';

export const StageColumn = ({ ...props }) => {
  const { opportunites, key, stage, handleAlert } = props;
  const classes = useStyles();
  const [columnItems, setColumnItems] = useState<IOpportunity[]>([]);
  const [addOpportunityDialog, setAddOpportunityDialog] = useState(false);

  useEffect(() => {
    if (opportunites?.length > 0) {
      let updatedColumnItems: IOpportunity[] = [];
      // eslint-disable-next-line array-callback-return
      opportunites.map((opportunity: IOpportunity) => {
        const lastStage = sorteStageHistory(opportunity).slice(-1)[0];
        if (lastStage === stage) updatedColumnItems.push(opportunity);
      });

      setColumnItems(updatedColumnItems);
    }
  }, [opportunites, stage]);

  const handleAddOpportunityDialog = () => {
    setAddOpportunityDialog(!addOpportunityDialog);
  };

  return (
    <>
      <Box className={classes.opportunitiesBoardColumn} key={key}>
        <Box className={classes.opportunitiesBoardColumnHeader}>
          <Typography variant='h3'>
            {`${capitalize(stage)}`} <span className={classes.opportunitiesBoardColumnCount}>{`(${columnItems.length})`}</span>
          </Typography>
          {stage === 'leads' && (
            <Button variant='contained' color='primary' onClick={handleAddOpportunityDialog}>
              Add Opportunity
            </Button>
          )}
        </Box>

        <Box className={classes.opportunitiesBoardColumnBody}>
          {columnItems.map((opportunity: IOpportunity, index: number) => (
            <OpportunityCard opportunity={opportunity} key={index} stage={stage} handleAlert={handleAlert} />
          ))}
        </Box>
      </Box>

      {addOpportunityDialog && <AddOpportunityDialog isOpen={addOpportunityDialog} onClose={handleAddOpportunityDialog} handleAlert={handleAlert} />}
    </>
  );
};
