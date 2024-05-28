import React, { useState } from 'react';
import { Link } from "react-router-dom";

import ModalDetalhesProduto from '../../../Produto/modalDetalhesProduto';
import { Card } from 'react-bootstrap';

const CategoriasList = ({ categorias }) =>{

    const [modal, setModal] = useState(false);
    const [produto, setProduto] = useState(false);


    return(
        <>
            <div className='row'>	
                {categorias.map((categoria) => (
                    <div key={categoria.id_categoria} className="col-12">
                        <Card>
                            <Card.Header className="d-block">
                                <Card.Title>{categoria.nome}</Card.Title>
                            </Card.Header>
                            
                            <Card.Body>                 
                                <div className='row'>
                                    {categoria.Produtos.map((item, ind) => (

                                        <div key={ind} className="col-lg-6 col-md-12" >
                                            <div className="card b-hover">
                                                <div className="card-body p-3">
                                                    <div className="menu-bx">
                                                        <div className="common d-flex justify-content-between">

                                                            <div className="d-flex  align-items-start" >
                                                                <img src={item.imagem} alt="" />        
                                                                <div>
                                                                    <Link to="#"><h4>{item.nome}</h4></Link>

                                                                    {item.tipo !== 'fixo' && (
                                                                        <span className='text-success'>
                                                                            <div className="d-flex align-items-center">
                                                                                a partir de &nbsp;
                                                                                <h3 className="mb-0 text-primary">
                                                                                    R$ {(item.preco.toFixed(2)).replace('.', ',')}
                                                                                </h3>
                                                                            </div>
                                                                        </span>
                                                                    )}

                                                                    {item.tipo == 'fixo' && (
                                                                        <h3 className="mb-0 text-primary">
                                                                            R$ {(item.preco.toFixed(2)).replace('.', ',')}
                                                                        </h3>
                                                                    )}
                                                                </div>                                   
                                                            </div>
                                                        
                                                            
                                                            <div className="card dishe-bx border-0">                           
                                                                <div className="common">
                                                                    <div className="plus c-pointer"
                                                                        onClick={()=>{setProduto(item); setModal(true)}}>
                                                                        <div className="sub-bx"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="d-flex align-items-center">
                                                            <svg className="me-2" width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <circle cx="2" cy="2.50003" r="2" fill="#C4C4C4"/>
                                                            </svg>
                                                            <p className=" font-w500 mb-0">{item.descricao}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

        {modal && (
            <ModalDetalhesProduto modal={modal} setModal={setModal} produto={produto}/>
        )}
   
        </>
    )
}
export default CategoriasList;