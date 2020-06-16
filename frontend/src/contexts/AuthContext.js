import React, { createContext, useState, useEffect, useContext } from 'react';

import api from '../services/axiosConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadDataFromStorage() {
      const storagedUser = localStorage.getItem('user');
      const storagedRefreshToken = localStorage.getItem('refreshToken');
  
      if(storagedUser && storagedRefreshToken) {
        try{
          const accessToken = await api.post('/token', { refreshToken: storagedRefreshToken });
          if(accessToken) {
            setUser(JSON.parse(storagedUser));
            localStorage.setItem('accessToken', accessToken.data.accessToken);
          }
        } catch(error) {
          //refresh token da storage não é valido
        }
      }
    }
    loadDataFromStorage();
  }, []);

  async function login(email, password) {    
    try {
      const response = await api.get('/login', {
        auth: {
          username: email,
          password: password,
        }
      });
  
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      setUser(response.data.user);
    } catch (error) {
      console.log(error)
      alert('Falha no login, tente novamente.');
    }     
  }

  async function logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if(refreshToken) {
      try{
        await api.delete('logout', { refreshToken: refreshToken });
      } catch (error) {
        alert('Falha ao deslogar, tente novamente.');
      }
    }
    localStorage.clear();
    setUser(null);
  }
  
  return (
    <AuthContext.Provider value={{signed: !!user, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const authContext = useContext(AuthContext);

  return authContext;
}