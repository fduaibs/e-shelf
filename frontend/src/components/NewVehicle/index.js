import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/axiosConfig';
import './styles.css';

import eshelfLogo from '../../assets/eshelfLogo.png';

export default function NewVehicle() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [motor, setMotor] = useState('');
  const [kms, setKms] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [other, setOther] = useState('');

  const { signed, loadingUser, verifyStorage } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if(!signed && !loadingUser) history.push('/login');
    
  }, [signed, history, loadingUser]);

  async function handleNewVehicle(e) {
    e.preventDefault();

    const storagedAccessToken = localStorage.getItem('accessToken');

    const data = {
      brand,
      model,
      year,
      motor,
      kms,
      color,
      price,
      other
    }

    try{
      const response = await api.post('vehicles/new', data, {
        headers: {
          'Authorization': `Bearer ${storagedAccessToken}`
        },
      });
      if(response.status === 201) {
        setBrand('');
        setModel('');
        setYear('');
        setMotor('');
        setKms('');
        setColor('');
        setPrice(0);
        setOther('');
        alert('Veículo criado com sucesso.');
      }
    } catch(error) {
      verifyStorage();
      alert('Não foi possível criar um novo veículo, tente novamente.');
    }
  }

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

        <form onSubmit={handleNewVehicle}>
          <input type="text" placeholder="Marca" value={brand} onChange={e => setBrand(e.target.value)}/>
          <input type="text" placeholder="Modelo" value={model} onChange={e => setModel(e.target.value)}/>
          <input type="text" placeholder="Ano" value={year} onChange={e => setYear(e.target.value)}/>
          <input type="text" placeholder="Motor" value={motor} onChange={e => setMotor(e.target.value)}/>
          <input type="text" placeholder="Quilometragem" value={kms} onChange={e => setKms(e.target.value)}/>
          <input type="text" placeholder="Cor" value={color} onChange={e => setColor(e.target.value)}/>
          <input type="text" placeholder="Valor" value={price} onChange={e => setPrice(e.target.value)}/>
          <textarea type="text" placeholder="Outros" value={other} onChange={e => setOther(e.target.value)}/>
          <button className="button" type="submit">Cadastrar novo veículo</button>
        </form>
      </div>
    </div>
  );
}