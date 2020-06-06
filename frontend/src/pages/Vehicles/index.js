import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import eshelfLogo from '../../assets/eshelfLogo.png';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await api.get('vehicles');
        setVehicles(response.data);
      } catch(error) {
        alert('Não foi possivel carregar os veículos, tente novamente.');
      }
    }
    fetchVehicles();
  }, [vehicles]);

  async function handleDeleteVehicle(vehicleId) {
    try {
      await api.delete(`vehicles/${vehicleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
    } catch(error) {
      alert('Não foi possível deletar o veículo, tente novamente.')
    }
  }

  return (
    <div className="vehicles-container">
      <header>
        <img src={eshelfLogo} alt="E-Shelf"/>
        <span>Bem vindo, user</span>

        <Link className="button" to="/vehicles/new">Cadastrar novo veículo</Link>
        <button type="button">
          <FiPower size={18} color="#41414d" />
        </button>
      </header>
      <h1>Veículos cadastrados</h1>

      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle._id}>
          <strong>{`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}</strong>
          <p>{`Motor: ${vehicle.motor}`}</p>
          <p>{`Quilometragem: ${vehicle.kms}`}</p>
          <p>{`Cor: ${vehicle.color}`}</p>
          <strong>{`${vehicle.other}`}</strong>
          <strong>Valor:</strong>
          <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vehicle.price)}</p>

          <button type="button" onClick={() => handleDeleteVehicle(vehicle._id)}>
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
          </li>
        ))}
      </ul>
    </div>
  );
}