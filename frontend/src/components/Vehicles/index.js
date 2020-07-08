import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/axiosConfig';

import './styles.css';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  const { signed, verifyStorage } = useAuth();
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
    if(!signed) {
      localStorage.clear();
      alert('Você deve estar logado para excluir veículos.');
    }
    try {
      await api.delete(`vehicles/${vehicleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
    } catch(error) {
      verifyStorage();
      alert('Não foi possível deletar o veículo, tente novamente.');
    }
  }

  return (
    <div className="vehicles-container">
      <header>
        <Link className="button" to="/">Voltar p home</Link>
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
            {signed ? (<button type="button" onClick={() => handleDeleteVehicle(vehicle._id)}>
              {/* <FiTrash2 size={20} color="#a8a8b3" /> */}
            </button>):(<div/>)}              
          </li>
        ))}
      </ul>
    </div>
  );
}