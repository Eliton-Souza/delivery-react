import React, { Fragment, useEffect, useState } from "react";
import { Button, Dropdown, Tab, Nav, ListGroup } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import cover from "../../../../images/profile/cover.jpg";
import suaLogo from "../../../../images/suaLogoAqui.png";
import { api } from "../../../../services/api";

import { pathLista } from "./Categorias/icones";
import LoadingPage from "../../../components/componentes/LoadingPage";

import ModalEditarDados from "./EditarPerfil/modalEditarDados";
import { pegarStatusHorarios } from "./helper";
import CategoriasList from "./Categorias/categoriasList";
import CadastrarCategoria from "./Categorias/cadastrarCategoria";
import OrdenarCategoria from "./Categorias/ordenarCategoria";

const HomeLoja = () => {
	
	const navigate = useNavigate();

	const [loading, setLoading] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalCategoria, setModalCategoria] = useState(false);
  const [modalOrdenar, setModalOrdenar] = useState(false);

  const [imagens, setImagens] = useState( {logo: null, capa: null});
  const [detalhes, setDetalhes] = useState( {nome: null, contato: null});
  const [categorias, setCategorias] = useState([]);
  const [tempoEntrega, setTempoEntrega] = useState(null);
  const [horariosLoja, setHorariosLoja] = useState([]);
  const [hFuncionamento, setHFuncionamento] = useState(null);

  const [dadosDaLoja, setDadosDaLoja] = useState(null);

	const pegarDadosLoja= async () => {    
	
      setLoading(true);
      const resultDados = await api.dadosLojaFuncionario();			

      if(resultDados.success){
        console.log(resultDados.loja);
        
        setDadosDaLoja(resultDados.loja);

        setImagens({ 
          logo: resultDados.loja.logo!= '' ? resultDados.loja.logo : suaLogo,
          capa: resultDados.loja.capa!= '' ? resultDados.loja.capa : cover,
        });

        setDetalhes({ 
          nome: resultDados.loja.nome,
          contato: resultDados.loja.contato,
        });

        setCategorias(resultDados.loja.Categoria);

        setTempoEntrega(resultDados.loja.entrega);

        setHorariosLoja(resultDados.loja.HorarioLojas);
      }else{
        swal("Oops", resultDados.error, "error");
        navigate('/page-error-404');
        
      }
      setLoading(false);
    
	}    
  useEffect(() => {
    pegarDadosLoja();
  }, []); 


  useEffect(() => {
    if(horariosLoja.length>0){
      pegarStatusHorarios(horariosLoja, setHFuncionamento);
    }
  }, [horariosLoja]);

   

  return (
    <>
      {loading && (
        <LoadingPage></LoadingPage>
      )}

      {dadosDaLoja && (        
        <Fragment>
          <div className="row">
            <div className="col-lg-12">
              <div className="profile card card-body px-3 pt-3 pb-0">
                <div className="profile-head">
                  <div className="photo-content">
                    {/* foto de capa */}
                    <img src={imagens.capa} className="cover-photo rounded" alt="Capa"/>
                  </div>
                  <div className="profile-info">
                    <div className="profile-photo">
                      <img src={imagens.logo} className="img-fluid rounded-circle" alt="Logo"/>
                    </div>
                    <div className="profile-details">
                      <div className="profile-name px-3 pt-2">
                        <h4 className="text-primary mb-0">{detalhes.nome ?? '...'}</h4>
                        <p>{hFuncionamento}</p>
                      </div>
                      <div className="profile-email px-2 pt-2">
                        <h4 className="text-muted mb-0 ">
                        <i class="fa-brands fa-whatsapp fa-fade text-success"></i>
                          {' ' + detalhes.contato ?? '...'}
                        </h4>
                        <p>{tempoEntrega ? 'Tempo de Entrega: '+ (tempoEntrega.substring(0, 2) != '00' ? tempoEntrega.substring(0, 2) + 'h ' : '') + (tempoEntrega.substring(3, 5) != '00' ? tempoEntrega.substring(3, 5) + 'min' : '') : ' Não realizando entregas no momento'}</p>
                      </div>
                      <Dropdown className="ms-auto">
                        <Button className="me-2" variant="outline-primary btn-rounded" onClick={()=>{setModal(true)}}>
                          Editar
                          <span className="btn-icon-end">
                            <i className="fa fa-edit" />
                          </span>
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}


      {categorias && (        
        <Fragment>
          <Tab.Container defaultActiveKey="List">

          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">  
              <Dropdown>
                <Dropdown.Toggle variant="primary">
                <i className="fa fa-plus me-2" />
                  Adicionar
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <ListGroup.Item action as="li" onClick={() => setModalCategoria(true)}>Categoria</ListGroup.Item>
                  <ListGroup.Item action as="li" onClick={() => navigate('/funcionario/cadastrarProduto')}>Produto</ListGroup.Item> 
                  <ListGroup.Item action as="li" onClick={() => navigate('/funcionario/gerenciarGrupo')}>Grupo</ListGroup.Item>               
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="d-flex align-items-center">
              <Nav as="ul" className="grid-tab nav nav-pills" id="list-tab" role="tablist">
                <Nav.Item as="li" className="nav-item" role="presentation">
                  <Nav.Link as="button" className="nav-link me-3" id="pills-home-tab" onClick={()=> setModalOrdenar(true)} eventKey="List">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_730_817)">
                        {pathLista()}
                      </g>
                    </svg>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>

            <Tab.Content>
              <Tab.Pane eventKey="List">
                <CategoriasList categorias={categorias}/>
              </Tab.Pane>
            </Tab.Content>

          </Tab.Container>
        </Fragment>
      )}
        
      {modal && (
        <ModalEditarDados dados={{ detalhes: detalhes, setDetalhes: setDetalhes, imagens: imagens, setImagens: setImagens, horariosLoja: horariosLoja, setHorariosLoja: setHorariosLoja, tempoEntrega: tempoEntrega, setTempoEntrega: setTempoEntrega }} modal={modal} setModal={setModal}/>
      )}

      {modalCategoria && (
        <CadastrarCategoria setModal={setModalCategoria} categorias={categorias} setCategorias={setCategorias}/>
      )}

      {modalOrdenar && (
        <OrdenarCategoria setModal={setModalOrdenar} categorias={categorias} setCategorias={setCategorias}/>
      )}
    </>
  );
}
      
export default HomeLoja;
