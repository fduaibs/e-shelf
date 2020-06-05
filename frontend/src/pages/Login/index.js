import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import eshelfLogoImg from '../../assets/eshelfLogo.png';
import eshelfImg from '../../assets/eshelf.png';

export default function Login() {
  return (
    <div className="login-container">
      <section className="form">
        <img src={eshelfLogoImg} alt="E-Shelf"/>
        <form>
          <h1>Faça seu login</h1>

          <input placeholder="Seu e-mail"/>
          <input placeholder="Sua senha" type="password"/>
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