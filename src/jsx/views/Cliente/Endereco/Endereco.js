import React, { useEffect, useState } from 'react';
import { api } from '../../../../services/api';
import { Button, Card } from 'react-bootstrap';
import TituloPagina from '../../../components/componentes/TituloPagina';
import Drop from './DropEditDel';
import LoadingPage from '../../../components/componentes/LoadingPage';
import CadastrarEndereco from './CadastrarEndereco';
import EditarEndereco from './EditarEndereco';

const Endereco = () => {

  const [loading, setLoading] = useState(false);
  const [enderecos, setEnderecos] = useState([]);
  const [modal, setModal]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [enderecoEdit, setEnderecoEdit] = useState([]);
  

	const pegarEnderecos= async () => {    
	
		setLoading(true);
		const result = await api.pegarEnderecos();			

		if(result.success){
			setEnderecos(result.enderecos);
		}else{
			swal("Oops", result.error, "error");
		}
    	setLoading(false);
	}
    
  useEffect(() => {
    pegarEnderecos();
  }, []); 

	
	return(
		<>
      {loading && (
        <LoadingPage></LoadingPage>
      )}

      <TituloPagina titulo={"Endereços"}></TituloPagina>
      <br></br>

      <Card>          
        <Card.Body>
          {enderecos.length > 0 &&(
            <div className='row'>
              {enderecos.map((item, ind) => (
                <div key={ind} className="col-lg-6 col-md-12" >
                  <div className="card b-hover">
                    <div className="card-body p-3">
                      <div className="menu-bx">
                        <div className="common d-flex justify-content-between">
                          <div className="row">
          
                            <div className="d-flex  align-items-center justify-content-between mb-2">
                              <h4 className="mb-0">
                                {item.bairro + ', ' + item.rua + ', ' + item.numero}
                              </h4>

                              <Drop id_endereco={item.id_endereco} enderecos={enderecos} setEnderecos={setEnderecos} setModalEditar={setModalEditar} setEnderecoEdit={setEnderecoEdit}></Drop>
                            </div>
        
                            <div>
                              <div style={{ position: 'relative' }}>
                                <svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
                                    <circle cx="3" cy="3.5" r="3" fill="#C4C4C4"/>
                                </svg>
                                <p style={{ marginLeft: '12px', marginBottom: '0' }}>{item.descricao}</p>
                              </div>

                              <div style={{ position: 'relative' }}>
                                <svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
                                    <circle cx="3" cy="3.5" r="3" fill="#C4C4C4"/>
                                </svg>
                                <p style={{ marginLeft: '12px', marginBottom: '0' }}>{item.referencia}</p>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {enderecos.length == 0 && !loading &&(
            <div className='row'>
              Você não possui endereços cadastrados
            </div>
          )}
        </Card.Body>
        
        <Card.Footer>
          <Button className="btn btn-primary" disabled={loading} onClick={()=> {
            enderecos.length >= 6 ? 
                swal({
                  title: "Atenção",
                  text: "Você atingiu o limite máximo de endereços cadastrados. Por favor, exclua ou edite um endereço existente para adicionar um novo endereço.",
                  icon: "warning",
                })
              :  
                setModal(true)} 
            }>
            <i className="fa fa-plus me-2" />
            Novo endereço
          </Button>
        </Card.Footer>
      </Card>

      {modal && (
        <CadastrarEndereco setModal={setModal} enderecos={enderecos} setEnderecos={setEnderecos}></CadastrarEndereco>
      )}

      {modalEditar && (
        <EditarEndereco setModal={setModalEditar} enderecoEdit={enderecoEdit} enderecos={enderecos} setEnderecos={setEnderecos}></EditarEndereco>
      )}
		</>
	)
}

export default Endereco;