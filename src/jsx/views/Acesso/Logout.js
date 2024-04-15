import { useEffect } from 'react';
import { limpaLS } from '../../../services/api';

export default () => {
    
  useEffect(() => {
    limpaLS();
    window.location.href = '/login';
  }, []); 

  return null;
}