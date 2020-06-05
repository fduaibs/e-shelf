import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';

import eshelfLogo from '../../assets/eshelfLogo.png';

export default function Register() {
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

        <form>
          <input type="text" placeholder="Nome"/>
          <input type="email" placeholder="E-mail"/>
          <input type="password" placeholder="Senha"/>
          <button className="button" type="submit">Cadastrar novo usuário</button>
        </form>
      </div>
    </div>
  );
}