import PropTypes from "prop-types"
import React, { useState } from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import styled from '@emotion/styled';
import MenuIcon from '@material-ui/icons/Menu';
import { UserInfo, DrawerMenu } from '.';
import useAuth from '../utils/useAuth';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
}));

// TODO: should have better way
const StyledLink = styled.div(`
  a {
    color: #fff;
    text-decoration: none;
  }
`);

const Header = ({ siteTitle }) => {
  const { loggedIn } = useAuth();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {loggedIn &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          }
          <Typography variant="h6" className={classes.title}>
            <StyledLink>
              <Link to="/" className={classes.link}>{siteTitle}</Link>
            </StyledLink>
          </Typography>
          <UserInfo />
        </Toolbar>
      </AppBar>
      <DrawerMenu toggleHandler={toggleDrawer} openState={open} />
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
