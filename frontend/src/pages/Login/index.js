import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/axiosConfig';
import './styles.css';

import eshelfLogoImg from '../../assets/eshelfLogo.png';
import eshelfImg from '../../assets/eshelf.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.get('login', {
        auth: {
          username: email,
          password: password,
        }
      });

      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('userName', response.data.user.name);
      localStorage.setItem('userEmail', response.data.user.email);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      history.push('/');
    } catch (error) {
      alert('Falha no login, tente novamente.');
    }    
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={eshelfLogoImg} alt="E-Shelf"/>
        
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input 
            placeholder="Seu e-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="Sua senha" 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#41414d" />
            Voltar para Home
          </Link>
        </form>
      </section>

      <img src={eshelfImg} alt="E-Shelf"/>
    </div>
  );
}