import { useStyles } from '../../styles/styles';

interface FormAlertProps {
  errors: string[];
}
export const FormAlert = (props: FormAlertProps) => {
  const { errors } = props;
  const classes = useStyles();

  return (
    <>
      {errors.length > 0 && (
        <div className={classes.formAlert}>
          <div className={classes.formAlertIcon}></div>
          <div className={classes.formAlertContent}>
            <ul>{errors && errors.map((error: string, index: number) => <li key={index}>{error}</li>)}</ul>
          </div>
        </div>
      )}
    </>
  );
};
