import React from 'react';
import { FormControl, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  formTextInput: {
    '& p': {
      display: 'inline-block',
      fontSize: '1rem',
      fontWeight: 500,
      padding: '0 0 .125rem',
      color: '#4a5162',
    },
  },
  formTextInputField: {
    fontFamily: 'inherit',
    color: 'inherit',
    fontSize: '1rem',
    lineHeight: '1.375',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: '1.25rem',
    backgroundColor: '#fff',
    padding: '1rem 1.125rem',
    width: '100%',
    outline: '0',
    height: '3.5rem',
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '&:focus': {
      borderColor: '#4ba4da',
      borderWidth: '2px',
      padding: '.9375rem 1.0625rem',
    },
    '&.small': {
      marginLeft: '-1.35rem',
      padding: '.5rem 1rem',
      height: '35px',
    },
  },
});

function FormTextInput({ ...props }) {
  const classes = useStyles();

  return (
    <FormControl fullWidth className={classes.formTextInput}>
      {props.label && <Typography variant='body1'>{props.label}</Typography>}
      <input
        {...props}
        type={props?.type || 'text'}
        className={`${classes.formTextInputField} small`}
        name={props.name}
        placeholder={props?.placeholder || ''}
        defaultValue={props?.defaultValue || ''}
      />
    </FormControl>
  );
}

export default FormTextInput;
