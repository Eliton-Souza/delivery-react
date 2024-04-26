import React, { Fragment, useEffect, useState } from "react";
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';



import cover from "../../../../images/profile/cover.jpg";
import { api } from "../../../../services/api";


import ProdutosList from "../../Produto/produtosList";
import ProdutosGrid from "../../Produto/produtosGrid";
import { pathGrid, pathLista } from "./icones";
import LoadingPage from "../../../components/componentes/LoadingPage";






const PerfilLoja = () => {
	
	const navigate = useNavigate();

	const { nome_loja } = useParams();
	const [loading, setLoading] = useState(null);

  const [dadosDaLoja, setDadosDaLoja] = useState(null);
  const [produtos, setProdutos] = useState(null);


  const agruparPorCategoria = (produtos) => {
    return produtos.reduce((agrupados, produto) => {
      (agrupados[produto.categoria] = agrupados[produto.categoria] || []).push(produto);
      return agrupados;
    }, {});
  }; 

	const pegarDadosLoja= async () => {    
	
		setLoading(true);
    const nomeFormatado = nome_loja.replace(/-/g, ' ');
		const resultDados = await api.dadosLoja(nomeFormatado);			
		

		if(resultDados.success){
			
			setDadosDaLoja(resultDados.loja);
					
			
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

    
  useEffect(() => {
    pegarDadosLoja();
  }, []); 
		
    const aviso= async () => {    
      swal("Carregando...", "", "info");
    }


    
    

    return (
        <>
        {produtos && (

        
        
        <Fragment>
          <div className="row">
            <div className="col-lg-12">
              <div className="profile card card-body px-3 pt-3 pb-0">
                <div className="profile-head">
                  <div className="photo-content">
                    {/* foto de capa */}
                    <img src={dadosDaLoja.capa != '' ? dadosDaLoja.capa : cover} className="cover-photo rounded" alt="capa"/>
                  </div>
                  <div className="profile-info">

                    {dadosDaLoja.logo != '' && ( 
                      <div className="profile-photo">
                        <img src={dadosDaLoja.logo} className="img-fluid rounded-circle" alt="profile"/>
                      </div>
                    )}
                    
                    <div className="profile-details">
                      <div className="profile-name px-3 pt-2">
                        <h4 className="text-primary mb-0">{dadosDaLoja ? dadosDaLoja.nome : '...'}</h4>
                        <p>aberto até: 22h</p>
                      </div>
                      <div className="profile-email px-2 pt-2">
                        <h4 className="text-muted mb-0">hello@email.com</h4>
                        <p>Entrega Grátis - {dadosDaLoja ? dadosDaLoja.entrega : ''}</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          
      
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

        {loading && (
          <LoadingPage></LoadingPage>
        )}

        </>
      );
      
}
      
export default PerfilLoja;
