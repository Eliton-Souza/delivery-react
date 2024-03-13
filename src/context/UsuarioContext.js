import React, { createContext, useContext, useState } from 'react';
import { dadosUsuario } from '../services/api';

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const usuarioLS = dadosUsuario();
    return usuarioLS ? usuarioLS : null;
  });

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => useContext(UsuarioContext);