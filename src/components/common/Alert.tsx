import React, { useEffect } from 'react';
import { Dialog, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Alert = ({ ...props }) => {
  const { alert, handleAlert } = props;

  useEffect(() => {
    setTimeout(function () {
      handleAlert('', false);
    }, 3000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  const closeAlert = (event: any) => {
    event.preventDefault();
    handleAlert('', false);
  };

  return (
    <>
      {alert.isShown && (
        <Dialog open={true} onClose={closeAlert} aria-labelledby='dialog-title' aria-describedby='dialog-description' maxWidth='sm' fullWidth={true}>
          <DialogTitle id='dialog-title'>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Typography variant='h3'>{alert.message}</Typography>
              <IconButton onClick={closeAlert}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </DialogTitle>
        </Dialog>
      )}
    </>
  );
};
