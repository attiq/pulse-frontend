import { FormControl, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  datepickerInput: {
    '& fieldset': {
      borderRadius: '.5rem',
    },
    '& .MuiTypography-root': {
      display: 'inline-block',
      fontSize: '1.0625rem',
      fontWeight: 500,
      padding: '0 0 .125rem',
      color: '#4a5162',
    },
  },
});

function FormDatepicker({ ...props }) {
  const classes = useStyles();

  return (
    <FormControl fullWidth className={classes.datepickerInput} sx={props.inValid && { '& fieldset': { borderColor: '#e3795b !important' } }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...props}
          maxDate={new Date()}
          views={['year', 'month', 'day']}
          label=''
          value={props.value || null}
          onChange={(newValue: any) => props.onChangeHandler(newValue)}
          renderInput={(params: any) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                placeholder: props.placeholder,
              }}
            />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

export default FormDatepicker;
