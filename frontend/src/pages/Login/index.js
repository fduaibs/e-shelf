import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { useAuth } from '../../contexts/AuthContext';

import './styles.css';

import eshelfLogoImg from '../../assets/eshelfLogo.png';
import eshelfImg from '../../assets/eshelf.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
  const { login } = useAuth();

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
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