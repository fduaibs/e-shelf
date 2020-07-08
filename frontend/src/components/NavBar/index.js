import React from 'react';

import { AppBar, Toolbar } from '@material-ui/core';
import './styles.js';
import useStyles from './styles.js';

export default function NavBar() {
  const styles = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>

      </Toolbar>
    </AppBar>
  );
}