import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCarrinhoLS, setCarrinhoLS } from '../services/api';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState(() => {
        const carrinhoLocalStorage = getCarrinhoLS();
        return carrinhoLocalStorage ? JSON.parse(carrinhoLocalStorage) : null;
      });

  useEffect(() => {
    setCarrinhoLS(carrinho);   //salva no localStorage
  }, [carrinho]);

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);