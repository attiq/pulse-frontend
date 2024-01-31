import React from 'react';
import { Box } from '@mui/material';
import LinkTag from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import LogoImage from '../../assets/images/logo_image.svg';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  nav: {
    display: 'flex',
    height: '3.5rem',
    backgroundColor: '#ffffff',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '1000',
    padding: '0 1.25rem',
    boxShadow: '0px 4px 4px 0px #00000040',
  },
  navBrand: {
    width: '13.75rem',
    height: '100%',
    padding: '0.75rem 2.5rem 0.5rem 1.5rem',
  },
});

function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <nav className={classes.nav}>
      <Box className={classes.navBrand}>
        <LinkTag onClick={() => navigate(`/`)}>
          <img src={LogoImage} alt='Pulse' />
        </LinkTag>
      </Box>
    </nav>
  );
}

export default Navbar;
