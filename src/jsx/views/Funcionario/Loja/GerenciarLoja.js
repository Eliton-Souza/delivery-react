import React, { Fragment, useEffect, useState } from "react";
import { Button, Dropdown, Tab, Nav } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';



import cover from "../../../../images/profile/cover.jpg";
import suaLogo from "../../../../images/suaLogoAqui.png";
import { api } from "../../../../services/api";


import ProdutosList from "../../Produto/produtosList";
import ProdutosGrid from "../../Produto/produtosGrid";
import { pathGrid, pathLista } from "./icones";
import LoadingPage from "../../../components/componentes/LoadingPage";

import { useUsuario } from "../../../../context/UsuarioContext";
import ModalEditarDados from "./modalEditarDados";
import { pegarStatusHorarios } from "./helper";

const GerenciarLoja = () => {
	
	const navigate = useNavigate();

	const { usuario } = useUsuario();
	const [loading, setLoading] = useState(null);
  const [modal, setModal] = useState(false);
  const [imagens, setImagens] = useState( {logo: null, capa: null});
  const [detalhes, setDetalhes] = useState( {nome: null, contato: null});
  const [tempoEntrega, setTempoEntrega] = useState(null);
  const [horariosLoja, setHorariosLoja] = useState([]);
  const [hFuncionamento, setHFuncionamento] = useState(null);

  const [dadosDaLoja, setDadosDaLoja] = useState(null);
  const [produtos, setProdutos] = useState(null);

  const agruparPorCategoria = (produtos) => {
    return produtos.reduce((agrupados, produto) => {
      (agrupados[produto.categoria] = agrupados[produto.categoria] || []).push(produto);
      return agrupados;
    }, {});
  }; 

	const pegarDadosLoja= async () => {    
	
    if(usuario.id_funcionario){

      setLoading(true);
      const resultDados = await api.dadosLojaFuncionario();			

      if(resultDados.success){
        
        setDadosDaLoja(resultDados.loja);

        setImagens({ 
          logo: resultDados.loja.logo!= '' ? resultDados.loja.logo : suaLogo,
          capa: resultDados.loja.capa!= '' ? resultDados.loja.capa : cover,
        });

        setDetalhes({ 
          nome: resultDados.loja.nome,
          contato: resultDados.loja.contato,
        });

        setTempoEntrega(resultDados.loja.entrega);

        setHorariosLoja(resultDados.loja.HorarioLojas);
    
        const resultProdutos = await api.produtosLoja(resultDados.loja.id_loja);			

        if(resultProdutos.success){
          const produtosAgrupados = agruparPorCategoria(resultProdutos.produtos);
          setProdutos(produtosAgrupados);
        }else{
          swal("Oops", resultProdutos.error, "error");
        }
      }else{
        swal("Oops", resultDados.error, "error");
        navigate('/page-error-404');
        
      }
      setLoading(false);
    }
    else{
      navigate('/logout');
    }
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
                        <p>{tempoEntrega ? tempoEntrega.substring(0, 5) + ' min' : 'Não realizando entregas'}</p>
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


      {produtos && (        
        <Fragment>
          <Tab.Container defaultActiveKey="List">
            <div className="d-flex align-items-center justify-content-end mb-4">
              <Nav as="ul" className="grid-tab nav nav-pills" id="list-tab" role="tablist">
                <Nav.Item as="li" className="nav-item" role="presentation" >
                  <Nav.Link as="button" className="nav-link me-3" id="pills-home-tab" eventKey="List">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_730_817)">
                        {pathGrid()}
                      </g>
                      <defs>
                        <clipPath id="clip0_730_817">
                          <rect x="0.410156" y="0.411743" width="21.1765" height="21.1765" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" className="nav-item " role="presentation">
                  <Nav.Link as="button" className="nav-link" id="pills-grid-tab" eventKey="Grid">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {pathLista()}
                    </svg>
                  </Nav.Link>
                </Nav.Item>
              </Nav>                        
            </div>

            <Tab.Content>
              <Tab.Pane eventKey="List">
                <ProdutosList produtos={produtos}/>
              </Tab.Pane>

              <Tab.Pane eventKey="Grid">
                <ProdutosGrid produtos={produtos}/>
              </Tab.Pane>
            </Tab.Content>

          </Tab.Container>
        </Fragment>
      )}
        
      {modal && (
        <ModalEditarDados dados={{ detalhes: detalhes, setDetalhes: setDetalhes, imagens: imagens, setImagens: setImagens, horariosLoja: horariosLoja, setHorariosLoja: setHorariosLoja, tempoEntrega: tempoEntrega, setTempoEntrega: setTempoEntrega }} modal={modal} setModal={setModal}/>
      )}

    </>
  );
}
      
export default GerenciarLoja;
