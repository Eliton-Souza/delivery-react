import React, { useState } from 'react';
import { api } from '../../../services/api';
import { Dropdown } from 'react-bootstrap';
import LoadingPage from '../../components/componentes/LoadingPage';


const Drop = ({id_endereco, enderecos, setEnderecos, setModalEditar, setEnderecoEdit}) => {

  const [loading, setLoading] = useState(false);

  const deletar= async () => {    
	
    setLoading(true);
    const result = await api.deletarEndereco(id_endereco);
  
    if(result.success){
      swal("Feito! Endereço deletado com sucesso!", {
        icon: "success",
      });
      const novosEnderecos = enderecos.filter(endereco => endereco.id_endereco !== id_endereco);
      setEnderecos(novosEnderecos);
    }else{
      swal("Oops", result.error, "error");        
    }

    setLoading(false);
  }

	const deletarEndereco= () => {    
    swal({
      title: "Deseja realmente deletar este endereço?",
      text: "Atenção! Esta ação é irrevesível",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        confirm: "Deletar"
      },
      dangerMode: true,
    }).then((deletou) => {
      if (deletou) {
        deletar()			
      } else {
        swal("Sua lista de endereços não foi alterada");
      }
    })
	}

  const pegarEndereco= () => {    
    const endereco = enderecos.find((endereco) => endereco.id_endereco == id_endereco);
    setEnderecoEdit(endereco);
	}

	return(
		<>

      {loading && (
        <LoadingPage></LoadingPage>
      )}

      <Dropdown>
       <Dropdown.Toggle variant="" className="btn btn-primary tp-btn-light sharp i-false">
          <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
             <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24"></rect>
                <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                <circle fill="#000000" cx="19" cy="12" r="2"></circle>
             </g>
          </svg>
       </Dropdown.Toggle>
       <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={()=> {setModalEditar(true); pegarEndereco()}}>
            Editar
          </Dropdown.Item>
          <Dropdown.Item href="#" onClick={()=> deletarEndereco()} className="text-danger">
            Deletar
          </Dropdown.Item>
       </Dropdown.Menu>
      </Dropdown>
		</>
	)
}

export default Drop;