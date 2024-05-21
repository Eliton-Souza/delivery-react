import { jwtDecode } from "jwt-decode";
import http from "./axiosConfig";


export const getCarrinhoLS = () => {
  return localStorage.getItem('carrinho');
};

export const setCarrinhoLS = (carrinho) => {
  return localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

export const limpaLS = () => {
  return localStorage.clear();
};



export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

/*export const removeToken = () => {
  localStorage.removeItem('token');
};
*/
export const dadosUsuario = () => {
  const token = getToken();

  if(token){
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }

  return false;  
};

export const decodeToken = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken;
};


export const pegarLocalizacao = async () => {
  try {
    const response = await http.post(
      'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCW4Oli-CFB7gjpPZzYb9YN1lgg2XESN6I',
      {considerIp: false}
    );

    return response.data;
   
  } catch (error) {

    if (error.response.status === 404) {
      return ({status: 404, error: "Não encontramos sua localização precisa. Por favor, faça ajustes no mapa arrastando o ponteiro vermelho ou tente repetir este processo usando um dispositivo móvel"});
    } else if (error.response.status === 429) {
      return ({status: 429, error: "Você está fazendo muitas requisições em pouco tempo, aguarde!"});
    }

    return ({status: 500, error: "Ocorreu algum erro, tente novamente!"});
  }
};



export const api = {

  validaToken: async () => {
    const response = await http.get('/rotaProtegida', {});
    return response.data;
  },


  //envia mensagem de validação
  validaNumero: async (celular) => {
    const response = await http.post('/celular', {
      celular
    });
    return response.data;
  },

  //valida mensagem enviada
  validaCodigo: async (celular, codigo) => {
    const response = await http.post('/codigo', {
      celular,
      codigo
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


    



  //USUARIO
  cadastrarUsuario: async (nome, sobrenome, genero, nascimento, email, celular, senha, tipo, id_loja, avatar) => {
    const response = await http.post('/usuario', {
      nome, sobrenome, genero, nascimento, email, celular, senha, tipo, id_loja, avatar
    });
      
    return response.data;
  },


  //ENDEREÇO
  cadastrarEndereco: async (estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude) => {
    const response = await http.post('/endereco', {
      estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude
    });
      
    return response.data;
  },

  editarEndereco: async (id_endereco, estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude) => {
    const response = await http.put(`/endereco/${id_endereco}`, {
      estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude
    });
      
    return response.data;
  },

  pegarEnderecos: async () => {
    const response = await http.get('/endereco');
    return response.data;
  },

  deletarEndereco: async (id_endereco) => {
    const response = await http.delete(`/endereco/${id_endereco}`);
    return response.data;
  },


  //LOJA
  dadosLoja: async (nome_loja) => {
    const response = await http.get(`/loja/${nome_loja}`);
    return response.data;
  },

  dadosLojaFuncionario: async () => {
    const response = await http.get('/loja');
    return response.data;
  },

  pegarLojas: async () => {
    const response = await http.get('/lojas');
    return response.data;
  },

  produtosLoja: async (id_loja) => {
    const response = await http.get(`/produtos/${id_loja}`);
    return response.data;
  },

  editarNomeContato: async (nome, contato) => {
    const response = await http.put('loja/detalhes', {
      nome, contato
    });
    return response.data;
  },

  editarHorarios: async (horarios) => {
    const response = await http.put('/loja/horarios', {
      horarios
    });
    return response.data;
  },
  

  //IMAGENS LOJA  
  pegarImagem: async (link) => {
    const encodedLink = encodeURIComponent(link);
    const response = await http.get(`/imagem/${encodedLink}`);
    return response.data;
  },

  atualizarImagemPerfilLoja: async (linkImagem, tipo) => {
    const response = await http.put('/loja/imagem', {
      linkImagem, tipo
    });
    return response.data;
  },

  uploadFoto: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await http.post('/upload-file', formData);
    return response.data;
  },

  //TAXAS DE ENTREGA LOJA
  pegarTaxasEntrega: async () => {
    const response = await http.get('/taxas');
    return response.data;
  },

  editarTaxas: async (taxas) => {
    const response = await http.put('/taxas', {
      taxas
    });
    return response.data;
  },



  //SABOR
  saboresProduto: async (id_produto) => {
    const response = await http.get(`/sabores/${id_produto}`);
    return response.data;
  },



  //BAIRRO
  pegarBairros: async (cidade) => {
    const response = await http.get(`/bairro/${cidade}`);
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
