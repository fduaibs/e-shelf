import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/axiosConfig';
import './styles.css';

import eshelfLogo from '../../assets/eshelfLogo.png';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(e) {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');  

    const data = {
      name,
      email,
      password
    }

    try{
      const response = await api.post('users/new', data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });
      if(response.status === 201) {
        setName('');
        setEmail('');
        setPassword('');
        alert('Usuário criado com sucesso.');
      }
    } catch(error) {
      alert('Não foi possível criar um novo usuário, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={eshelfLogo} alt="E-Shelf" />

          <h1>Cadastrar novos usuários</h1>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#41414d" />
            Voltar para Home
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="button" type="submit">Cadastrar novo usuário</button>
        </form>
      </div>
    </div>
  );
}