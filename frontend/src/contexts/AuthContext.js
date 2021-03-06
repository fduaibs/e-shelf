import React, { createContext, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/axiosConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ _id: null, email: null, name: null, isAdmin: null });
  const [signed, setSigned] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const history = useHistory();

  console.log('signed?', signed);
  console.log('loading?', loadingUser);
  
  useEffect(() => {
    const storagedUser = JSON.parse(localStorage.getItem('user'));
    const storagedRefreshToken = localStorage.getItem('refreshToken');

    if(storagedUser && storagedRefreshToken) {
      setUser(storagedUser);
      setSigned(true);
    }
    setLoadingUser(false);
  }, []);

  function verifyStorage() {
    const storagedUser = JSON.parse(localStorage.getItem('user'));
    const storagedRefreshToken = localStorage.getItem('refreshToken');

    if(!storagedRefreshToken || !storagedUser) {
      localStorage.clear();
      setUser({ _id: null, email: null, name: null, isAdmin: null });
      setSigned(false);
    }
  }

  async function login(email, password) { 
    try {
      const response = await api.get('/login', {
        auth: {
          username: email,
          password: password,
        }
      });

      // const { name: resName, email: resEmail, _id: resId } = response.data.user;
      // const userWithoutIsAdmin = { _id: resId, name: resName, email: resEmail };
  
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      setUser(response.data.user);
      setSigned(true);
      history.push('/');
    } catch (error) {
      alert('Falha no login, tente novamente.');
    }     
  }

  async function logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if(refreshToken) {
      try{
        await api.delete('/logout', { 
          data: {
            refreshToken: refreshToken
          }
        });
        localStorage.clear();
        setUser({ _id: null, email: null, name: null, isAdmin: null });
        setSigned(false);
        history.push('/'); 
      } catch (error) {
        alert('Falha ao deslogar, tente novamente.');
      }
    }
  }
  
  return (
    <AuthContext.Provider value={{signed, user, loadingUser, login, logout, verifyStorage}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const authContext = useContext(AuthContext);

  return authContext;
}