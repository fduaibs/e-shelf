import React from 'react';

import { useAuth } from '../contexts/AuthContext';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';


export default function Routes() {
  const { signed } = useAuth();
  console.log('signed:', signed)

  return signed ? <PrivateRoutes/> : <PublicRoutes/>
}