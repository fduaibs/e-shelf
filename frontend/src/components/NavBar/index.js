import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import { AppBar, Toolbar, Button, Typography, IconButton, Link as MuiLink, Menu, MenuItem } from '@material-ui/core';
import useStyles from './styles.js';
import { AccountCircle } from '@material-ui/icons';

import eshelfLogo from '../../assets/eshelfLogo.png';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const { signed, loadingUser, user, logout } = useAuth();

  const history = useHistory();

  const open = Boolean(anchorEl);

  const styles = useStyles();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    handleClose()
    history.push(`/users/${user._id}`);
  }

  const handleNewVehicle = () => {
    handleClose()
    history.push('/vehicles/new');
  }

  const handleNewUser = () => {
    handleClose()
    history.push('/users/new');
  }

  const handleLogout = () => {
    handleClose()
    logout()
  };

  return (
    <div className={styles.rootStyle}>
      <AppBar position="fixed">
        <Toolbar className={styles.toolbarStyle}>
          <MuiLink component={Link} to="/">
            <IconButton>
              <img className={styles.logoStyle} src={eshelfLogo} alt="E-Shelf"/>
            </IconButton>
          </MuiLink>
          <div className={styles.middleDivStyle} />
          {signed && !loadingUser ? (
            <>
              <Typography variant="body1" color="secondary">
                {user.name}
              </Typography>
              <IconButton
                className={styles.profileIconStyle}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true" 
                onClick={handleMenu}
                color="secondary"
              >
                <AccountCircle/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleMyAccount}>Minha conta</MenuItem>
                <MenuItem onClick={handleNewVehicle}>Cadastrar veículo</MenuItem>
                {user.isAdmin ? (
                  <MenuItem onClick={handleNewUser}>Cadastrar usuário</MenuItem>
                ):(
                  <div />
                )}
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </>
          ) : (
            <MuiLink component={Link} to="/login">
              <Button color="secondary">Login</Button>
            </MuiLink>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar className={styles.toolbarStyle}/>
    </div>
  );
}