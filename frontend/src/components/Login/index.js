import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import { Container, Grid, TextField, Button, Typography, Link as MuiLink } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import useStyles from './styles';

import eshelfLogoImg from '../../assets/eshelfLogo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const history = useHistory();  
  const { login, signed, loadingUser } = useAuth();

  const styles = useStyles();

  useEffect(() => {
    if(signed && !loadingUser) {
      history.push('/');
    }
  });

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs sm md/>
        <Grid container item className={styles.ContainerStyle} xs={12} sm={6} md={4}>
          <img src={eshelfLogoImg} alt="E-Shelf"/>
          <form className={styles.FormStyle} onSubmit={handleLogin}>
            <Typography variant="h6">Faça seu Login</Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth={true}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="Senha" 
              variant="outlined"
              fullWidth={true}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button 
              variant="contained"
              color="primary"
              fullWidth={true}
              type="submit"
            >
                Entrar
            </Button>

            <MuiLink className={styles.LinkStyle} component={Link} to="/">
              <Typography variant="body1">
                <KeyboardBackspace fontSize="small"/>
                Voltar para Home
              </Typography>
            </MuiLink>
          </form>
        </Grid>
        <Grid item xs sm md/>
      </Grid>
    </Container>
  );
}