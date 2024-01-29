import { jwtDecode } from "jwt-decode";
import http from "./axiosConfig";


export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const dadosUsuario = () => {
  const token = getToken();

  if(token){
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }

  return false;

  window.location.href = '/login';
  
};


export const api = {

  validaToken: async () => {
    const response = await http.get('/rotaProtegida', {});
    return response.data;
  },


  //envia mensagem de validação
  validaNumero: async (numero) => {
    const response = await http.post('/numero', {
      numero
    });
    return response.data;
  },


  fazerLogin: async (login, senha) => {
    const response = await http.post('/login', {
      login,
      senha,
    });

    return response.data;
  },









  //ALUNOS
  listarTodosAlunos: async () => {
    const response = await http.get('/alunos', {});
    return response.data;
  },

  rankingAlunos: async () => {
    const response = await http.get('/ranking', {});
    return response.data;
  },

  pegarAluno: async (id) => {
    const response = await http.get(`/aluno/${id}`, {});
    return response.data.aluno;
  },

  atualizarAluno: async ( id, nome, sobrenome, genero, nascimento, id_responsavel, id_manual) => {
    const response = await http.put(`/aluno/${id}`, {
      nome, sobrenome, genero, nascimento, id_responsavel, id_manual
    });

    return response.data;
  },

  criarAluno: async (nome, sobrenome, genero, nascimento, id_responsavel, id_manual) => {
    const response = await http.post('/aluno', {
      nome, sobrenome, genero, nascimento, id_responsavel, id_manual,
    });
      
    return response.data;
  },

  deletarAluno: async (id) => {
    const response = await http.delete(`/aluno/${id}`, {});      
    return response.data;
  },


};
