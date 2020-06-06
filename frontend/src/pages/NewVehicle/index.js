import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';

import eshelfLogo from '../../assets/eshelfLogo.png';

export default function NewVehicle() {
  return (
    <div className="new-vehicle-container">
      <div className="content">
        <section>
          <img src={eshelfLogo} alt="E-Shelf"/>

          <h1>Cadastrar novo veículo</h1>

          <Link className="back-link" to="/vehicles">
            <FiArrowLeft size={16} color="#41414d"/>
            Voltar para veículos
          </Link>
        </section>

        <form>
          <input type="text" placeholder="Marca"/>
          <input type="text" placeholder="Modelo"/>
          <input type="text" placeholder="Ano"/>
          <input type="text" placeholder="Motor"/>
          <input type="text" placeholder="Quilometragem"/>
          <input type="text" placeholder="Cor"/>
          <input type="text" placeholder="Preço"/>
          <textarea type="text" placeholder="Outros"/>
          <button className="button" type="submit">Cadastrar novo veículo</button>
        </form>
      </div>
    </div>
  );
}