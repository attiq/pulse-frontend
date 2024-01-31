import { makeStyles } from '@mui/styles';
import FormAlertBackgroundIcon from '../assets/images/alert_danger.svg';

export const useStyles = makeStyles({
  // Main Content
  mainContent: {
    padding: '2rem 2rem 4rem',
    '@media (max-width: 768px)': {
      padding: '2rem 1.5rem 2rem',
    },
  },
  contentContainer: {
    width: '100%',
    margin: '0 auto',
    marginTop: '3rem',
    '& .MuiGrid-root': {
      marginLeft: '0rem',
    },
    '& .MuiButtonBase-root': {
      padding: '.2rem .2rem !important',
      fontSize: '1rem !important',
    },
  },
  // Forms
  formTextInputField: {
    fontFamily: 'inherit',
    color: 'inherit',
    fontSize: '1rem',
    lineHeight: '1.375',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: '0.25rem',
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
    '&.invalid': {
      borderColor: '#e3795b',
    },
  },
  formTextInput: {
    '& p': {
      display: 'inline-block',
      fontSize: '1.0625rem',
      fontWeight: 500,
      padding: '0 0 .125rem',
      color: '#4a5162',
    },
  },
  formAlert: {
    position: 'relative',
    backgroundColor: '#ffffff',
    border: '1px solid #e3795b',
    borderRadius: '0.25rem',
    padding: '0 0 0 5rem',
  },
  formAlertIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '5rem',
    borderRadius: '0.25rem 0 0 0.25rem',
    backgroundColor: '#e3795b',
    backgroundImage: `url(${FormAlertBackgroundIcon})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
  formAlertContent: {
    padding: '1.25rem',
    fontSize: '1.0625rem',
    color: '#e3795b',
    '& p': {
      lineHeight: '1.375',
      color: '#4a5162',
    },
    '& ul': {
      margin: '1rem 0 0',
      padding: '0 0 0 1.25rem',
    },
  },

  // opportunities
  opportunitiesBoard: {
    flex: '1',
    overflowX: 'hidden',
    marginLeft: '.5rem !important',
  },
  opportunitiesBoardInner: {
    height: '100%',
    display: 'flex',
    overflowX: 'auto',
    '& > * + *': {
      marginLeft: '2rem',
    },
  },
  opportunitiesBoardColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: '0',
    width: '27rem',
    borderRadius: '0.25rem',
    backgroundColor: '#e8eef5',
    padding: '.5rem 1rem',
  },
  opportunitiesBoardColumnHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '2.5rem',
    '& .MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.125rem !important',
    },
    '& .MuiButtonBase-root': {
      padding: '.1rem !important',
      fontSize: '.8rem !important',
    },
  },

  opportunitiesBoardColumnBody: {
    padding: '1rem 0rem',
    maxHeight: '80rem',
    overflowY: 'auto',
    '& > *': {
      padding: '.5rem 0',
    },
  },
  opportunitiesBoardColumnCount: {
    display: 'inline-block',
    marginLeft: '.375rem',
  },

  // Profile Card
  profileCard: {
    boxShadow: '0 3px 6px rgba(0 0 0 / 16%) !important',
    marginBottom: '1rem',
    padding: '0 !important',
    '& .MuiCardContent-root': {
      padding: '0rem !important',
      position: 'relative',
      paddingTop: '1.5rem !important',
      '& .MuiGrid-root': {
        padding: '.5rem 0rem !important',
      },
      '& .MuiTypography-root': {
        padding: '.1rem 0rem 0rem .5rem !important',
      },
    },
    '&:hover': {
      '& div[data-testid="profile-fit"]': {
        display: 'flex !important',
      },
    },
  },
  profileCardInfo: {
    position: 'relative',
    paddingLeft: '5.75rem',
    minHeight: '4.75rem',
    '& .MuiAvatar-root': {
      position: 'absolute',
      top: '0',
      left: '0',
    },
    '&.with-expand': {
      minHeight: '6.75rem',
    },
  },
  profileCardAvatar: {
    marginLeft: '.5rem',
  },

  profileCardDoctorAvatar: {
    marginLeft: '1.5rem',
  },
  profileCardName: {
    fontSize: '1.125rem !important',
    color: '#4a5162 !important',
  },
  profileCardTitle: {
    fontSize: '.875rem !important',
    fontWeight: '500 !important',
    margin: '.125rem 0 0',
    '& span': {
      display: 'inline-block',
      color: '#777',
      '&::before': {
        color: '#4a5162 !important',
      },
    },
  },
  profileCardProcedure: {
    fontSize: '.875rem !important',
    fontWeight: '500 !important',
    margin: '.125rem 0 0',
  },
  profileCardStage: {
    display: 'flex',
    fontSize: '.875rem !important',
    color: '#777 !important',
    width: '4rem',
  },
  profileCardStageDate: {
    display: 'flex',
    fontSize: '.875rem !important',
    color: '#777 !important',
    marginLeft: '6rem !important',
  },
  profileCardDetails: {
    marginTop: '1.5rem',
    backgroundColor: '#C8E5FC',
  },
  memberAvatarPreview: {
    marginRight: '0rem !important',
  },
  memberUploadImage: {
    '& .MuiButtonBase-root': {
      marginLeft: '0rem !important',
      backgroundColor: '#ffffff !important',
      color: '#4a5162 !important',
      fontSize: '1rem !important',
      '&:hover': {
        boxShadow: 'none !important',
      },
      '&:focus': {
        backgroundColor: '#ffffff !important',
        boxShadow: 'none !important',
      },
    },
  },

  //FORM Select
  formSelectInput: {
    '& > p': {
      display: 'inline-block',
      fontSize: '1.0625rem',
      fontWeight: 500,
      margin: '0 0 .125rem',
      color: '#4a5162',
      '&.is-regular': {
        fontWeight: 400,
      },
      '&.small': {
        fontSize: '.9375rem',
      },
    },
    '& legend': {
      '& span': {
        display: 'none',
      },
    },
    '&.no-label': {
      '& .MuiOutlinedInput-notchedOutline': {
        top: '0',
      },
    },
  },
  selected: {
    paddingTop: '.5rem !important',
    paddingBottom: '.5rem !important',
    '&.Mui-selected': {
      backgroundColor: '#4ba4da !important',
      color: '#fff !important',
      '& .MuiAvatar-root': {
        color: '#4ba4da !important',
        backgroundColor: '#fff !important',
      },
      '& .MuiTypography-root': {
        color: '#fff !important',
      },
    },
  },
  formSelectInValid: {
    '& > p': {
      display: 'inline-block',
      fontSize: '1.0625rem',
      fontWeight: 500,
      margin: '0 0 .125rem',
      color: '#4a5162',
      '&.is-regular': {
        fontWeight: 400,
      },
      '&.small': {
        fontSize: '.9375rem',
      },
    },
    '& legend': {
      '& span': {
        display: 'none',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e3795b !important',
    },
    '&.no-label': {
      '& .MuiOutlinedInput-notchedOutline': {
        top: '0',
      },
    },
  },
});
