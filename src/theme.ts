import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';
import '@mui/lab/themeAugmentation';
import ProximaNovaBoldTff from './assets/fonts/proxima-nova/proximanova-bold-webfont.ttf';
import ProximaNovaSemiboldTff from './assets/fonts/proxima-nova/proximanova-semibold-webfont.ttf';
import ProximaNovaTff from './assets/fonts/proxima-nova/proximanova-regular-webfont.ttf';
import ProximaNovaLightTff from './assets/fonts/proxima-nova/proximanova-light-webfont.ttf';

const theme = {
  palette: {
    info: {
      main: '#a0a8b7',
      contrastText: '#ffffff',
    },
    primary: {
      main: '#4ba4da',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ebebed',
      contrastText: '#222e43',
    },
    success: {
      main: '#50ae81',
      contrastText: '#ffffff',
    },
    error: {
      main: '#e16d78',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: ['proxima-nova', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
      color: '#4a5162',
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.75rem',
      color: '#4a5162',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#4a5162',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#4a5162',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.125rem',
      color: '#4a5162',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      color: '#4a5162',
    },
    body1: {
      color: '#4a5162',
    },
    button: {
      fontSize: '1.125rem',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: '7.5rem',
          boxShadow: 'none',
        },
        outlined: {
          padding: '7px 23px',
        },
        contained: {
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          color: '#4a5162',
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '16px 24px 16px 32px !important',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '20px 32px !important',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '20px 32px',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '1.0625rem',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: ' 1.0625rem',
          fontWeight: 500,
          marginBottom: '.25rem',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: '0 3px 6px rgba(0 0 0 / 15%)',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        rail: {
          backgroundColor: '#d1dbe3 !important',
          opacity: '1 !important',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          fontSize: '1rem',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: '1px solid #d1dbe3',
          borderRadius: '.25rem',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          paddingLeft: '0',
          paddingRight: '0',
          marginRight: '3rem',
          minWidth: '4rem',
          color: '#4ba4da',
          '&.Mui-selected': {
            color: '#4a5162',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: '.25rem',
          borderRadius: '.125rem',
          backgroundColor: '#4a5162',
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-body': {
            backgroundColor: '#fff',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#f1f3f5',
            textTransform: 'uppercase',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'proxima-nova';
        font-style: normal;
        font-weight: 300;
        src: url(${ProximaNovaLightTff}) format('truetype');
      }  

        @font-face {
          font-family: 'proxima-nova';
          font-style: normal;
          font-weight: 400;
          src: url(${ProximaNovaTff}) format('truetype');
        }
        
        @font-face {
          font-family: 'proxima-nova';
          font-style: normal;
          font-weight: 500;
          src: url(${ProximaNovaSemiboldTff}) format('truetype');
        }

        @font-face {
          font-family: 'proxima-nova';
          font-style: normal;
          font-weight: 700;
          src: url(${ProximaNovaBoldTff}) format('truetype');
        }
        `,
    },
  },
} as const;

type CustomTheme = {
  [Key in keyof typeof theme]: (typeof theme)[Key];
};
declare module '@mui/material/styles/createTheme' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}
export default createTheme(theme);
