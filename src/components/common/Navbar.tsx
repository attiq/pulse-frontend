import React from 'react';
import { Box } from '@mui/material';
import LinkTag from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import LogoImage from '../../assets/images/logo_image.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/UserApi';

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
    width: '94%',
    height: '100%',
    padding: '0.75rem 2.5rem 0.5rem 1.5rem',
  },
  navLink: {
    display: 'block',
    padding: '1rem',
    fontSize: '1rem !important',
    fontWeight: '500 !important',
    cursor: 'pointer',
  },
});

export const Navbar = (props: any) => {
  const { setToken } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser(setToken));
  };

  return (
    <nav className={classes.nav}>
      <Box className={classes.navBrand}>
        <LinkTag onClick={() => navigate(`/`)}>
          <img src={LogoImage} alt='Pulse' />
        </LinkTag>
      </Box>
      <LinkTag className={classes.navLink} onClick={handleLogout}>
        Logout
      </LinkTag>
    </nav>
  );
};
