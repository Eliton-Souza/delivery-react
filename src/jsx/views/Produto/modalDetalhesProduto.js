import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { api } from "../../../services/api";
import { addProdutoCarrinho } from "./helper";
import LoadingPage from "../../components/componentes/LoadingPage";
import { useCarrinho } from "../../../context/CarrinhoContext";


const ModalDetalhesProduto = ({ modal, setModal, produto }) => {

  const { carrinho, setCarrinho } = useCarrinho();

  const [tamanhoSelecionado, setTamanhoSelecionado] = useState();
  const [tamanhos, setTamanhos] = useState([]);


  const [sabores, setSabores] = useState([]);
  const [grupoSabores, setGrupoSabores]= useState([]);
  const [maiorPrecoSabor, setMaiorPrecoSabor] = useState(null);

  const [saboresEscolhidos, setSaboresEscolhidos] = useState([]);
  const [numSabor, setNumSabor] = useState(null);
  const [quantProd, setQuantProd] = useState(1);


  const [valorTotal, setValorTotal] = useState(produto.preco);
  const [loading, setLoading] = useState(null);

    const pegarSabores= async () => {    
	
      setLoading(true);
      const result = await api.saboresProduto(produto.id_produto);
      
  
      if(result.success){

        // Agrupar os sabores por categoria
        const grupos = result.sabores.reduce((acc, sabor) => {
          const { categoria } = sabor;
          if (!acc[categoria]) {
            acc[categoria] = [];
          }
          acc[categoria].push(sabor);
          return acc;
        }, {});

        const primeiroItem = result.sabores[0];
        const chavesPrecos = Object.keys(primeiroItem.precos);

        setTamanhos(chavesPrecos);

        setSabores(result.sabores);
        setGrupoSabores(grupos);
      }else{
        setModal(false);
        swal("Oops", result.error, "error");        
      }

      setLoading(false);
    }
  
    useEffect(() => {
      if(produto.tipo != "fixo"){
        pegarSabores();
      }
    }, []); 

    
    const calcularTotal = () => {
    
      if(produto.tipo != "fixo"){
        let total = 0;

        saboresEscolhidos.forEach(item => {
          total = Math.max(total, item.preco);
        });

        setMaiorPrecoSabor(parseFloat(total).toFixed(2));
  
        total = (parseFloat(total) * quantProd).toFixed(2);
        setValorTotal(total);
      }else{
        const total = (parseFloat(produto.preco) * quantProd).toFixed(2);
        setValorTotal(total);
       }
     
    }


    const montarProduto = () => {
    
      if(produto.tipo != "fixo"){

        const produtoF= {
          id_produto: produto.id_produto,
          imagem: produto.imagem,
          nome: produto.nome,
          valorUnidade : maiorPrecoSabor,
          subtotal: valorTotal,
          tipo: produto.tipo,
          quantidade: quantProd,
          tamanho: tamanhoSelecionado.split("-")[0].trim(),
          sabores: saboresEscolhidos        
        };
        
        return produtoF;
      }else{

        const produtoF= {
          id_produto: produto.id_produto,
          imagem: produto.imagem,
          nome: produto.nome,
          valorUnidade: produto.preco,
          subtotal: valorTotal,
          tipo: produto.tipo,
          quantidade: quantProd,       
        };

        return produtoF;
      }
    }
    
    
    
    const adicionarRemoverSabor = (sabor) => {
        const index = saboresEscolhidos.findIndex(item => item.id_sabor === sabor.id_sabor);
        if (index !== -1) {
            // Se o produto já estiver na lista, remove-o
            const newSaboresEscolhidos = [...saboresEscolhidos]; // Criando uma cópia do array atual
            newSaboresEscolhidos.splice(index, 1); // Removendo o elemento
            setSaboresEscolhidos(newSaboresEscolhidos); // Atualizando o estado com o novo array
        } else {

          if (saboresEscolhidos.length >= numSabor) {
            swal("Oops", `Você pode escolher até ${numSabor} ${numSabor > 1 ? "sabores" : "sabor"}`, "info");
           }else{
            // Se o produto não estiver na lista, adiciona-o
            const novoSabor = {
              id_sabor: sabor.id_sabor,
              nome: sabor.nome,
              preco: sabor.precos[tamanhoSelecionado]
            };
          
            const newSaboresEscolhidos = [...saboresEscolhidos, novoSabor]; // Adicionando o novo produto ao array
            setSaboresEscolhidos(newSaboresEscolhidos); // Atualizando o estado com o novo array
          }
        }
    }

    const verificaQuantSabores = (num) => {
      if (saboresEscolhidos.length > num) {
       setSaboresEscolhidos([]);
      }
    }

    const pegaQuantSabores = () => {
      if(tamanhoSelecionado && produto.tipo!= "fixo"){
        const regex = /(\d+)\s(Sabor|Sabores)/;
        const match = tamanhoSelecionado.match(regex);

        if (match) {
          const numeroSabores = parseInt(match[1]); // Convertendo o valor correspondente para um número inteiro
          setNumSabor(numeroSabores);
          verificaQuantSabores(numeroSabores);
        } else {
          setModal(false);
          swal("Oops", "Número de sabores não encontrado", "error");
        }
      }
    }

    
    useEffect(() => {
        calcularTotal();
    }, [saboresEscolhidos, tamanhoSelecionado, quantProd]);


    useEffect(() => {
      pegaQuantSabores();
    }, [tamanhoSelecionado]);


  const verificarAdicionado = (sabor) => {
    const index = saboresEscolhidos.findIndex(item => item.id_sabor === sabor.id_sabor);
    if (index !== -1) {
       return true
    } else {
        return false
    }
  }

  
  const handleQuantProd = (event) => {
    if(event.target.value > 0 && event.target.value <= 50 ){
      setQuantProd(parseInt(event.target.value));
    }
    else if( event.target.value > 50 ){
      setQuantProd(50);
    }
    else{
      setQuantProd(0);
    }
  };

  const handleTamanhoChange = (event) => {
    setTamanhoSelecionado(event.target.value);
  };

  const adicionarCarrinho = () => {
    addProdutoCarrinho(montarProduto(), produto.id_loja, carrinho, setCarrinho);
    setModal(false);   
  };

  return (
    <>
      <Modal show={modal} onHide={() => { setModal(false) }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{produto.tipo != 'fixo'? "Personalize seu Pedido" : "Peça agora!"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">

                  {/* PARTE SUPERIOR DA PAGINA */}  
                  <div className="row">
                    <div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
                      <img className="img-fluid" src={produto.imagem} alt="" />
                    </div>
                    <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                      <div className="product-detail-content">
                        <div className="new-arrival-content pr">
                          <h4>{produto.nome}</h4>
                          <div className="d-table mb-2">
                            <p className="price float-left d-block">R$ {valorTotal}</p>
                          </div>
                          <p className="text-content">
                            {produto.descricao}
                          </p>
                        </div>
                        
                        {produto.tipo != 'fixo' && sabores &&(

                          <div className="row mb-3 mt-4">
                            <div className="div">
                                <h5>Tamanho</h5>
                                {tamanhos.map((chave, index) => (
                                  <div key={index} className="form-check">
                                      <input
                                          className="form-check-input"
                                          type="radio"
                                          name="gridRadios"
                                          onChange={handleTamanhoChange}
                                          value={chave}
                                      />
                                      <label className="form-check-label">
                                          {chave}
                                      </label>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {loading && (
                          <LoadingPage></LoadingPage>
                        )}
                        
                        
                 
                      </div>
                    </div>
                  </div>

                  {/*PARTE INFERIOR */}                
                  <div className="row mt-1">
                    <div className="col-xl-12">
                        

                      {produto.tipo != "fixo" && !tamanhoSelecionado && (
                          <Card.Header className="d-block">
                            <Card.Title>Selecione um tamanho</Card.Title>
                          </Card.Header>
                      )}          


                      {sabores && tamanhoSelecionado && produto.tipo != "fixo" &&(
                        <Card>
                          <Card.Header className="d-block">
                            <Card.Title>Selecione os Sabores</Card.Title>
                          </Card.Header>
                          <Card.Body>

                            <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
                              {Object.entries(grupoSabores).map(([categoria, sabor], index) => (
                                <Accordion.Item key={index} eventKey={index}>
                                  <Accordion.Header className="accordion-header">{categoria}</Accordion.Header>
                                  <Accordion.Body>
                                    <ul>
                                      {sabor.map((data, i) => (
                                        <li key={i}>
                                          <div className="col-xs-12">
                                            <div className="card b-hover">
                                              <div className="card-body p-3">
                                                  
                                                <div className="menu-bx">
                                                  <div className="common d-flex justify-content-between">
                                                    <div className="d-flex align-items-start">
                                                      <img src={data.imagem} alt="" />
                                                      <div>
                                                        <Link to="#"><h4>{data.nome}</h4></Link>
                                                        <h3 className="mb-0 text-primary">
                                                        R$ {tamanhoSelecionado? data.precos[tamanhoSelecionado]:'0.00'}
                                                        </h3>
                                                      </div>
                                                    </div>
                                                    <div className="card dishe-bx border-0">
                                                      <div className="common">
                                                        <div className={`plus c-pointer ${verificarAdicionado(data) ? "active" : ""}`}
                                                          onClick={() => adicionarRemoverSabor(data)}
                                                        >
                                                          <div className="sub-bx"></div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <p className="mb-0 font-w400">
                                                    {data.descricao}
                                                  </p>
                                                </div>

                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </Accordion.Body>
                                </Accordion.Item>
                              ))}
                            </Accordion>

                          </Card.Body>
                          
                          {saboresEscolhidos.length > 0 && (
                            <Card.Footer>
                              <div className="row">
                                <Card.Header className="d-block">
                                  <Card.Title>Sabores:</Card.Title>
                                  {saboresEscolhidos.map((sabor) => (
                                    <label key={sabor.id_sabor} className="form-check-label"> {/* Use sabor.id como chave */}
                                      <Badge as="a" href="" bg="success badge-rounded">
                                        {sabor.nome}
                                      </Badge>
                                    </label>
                                  ))}
                                </Card.Header>
                              </div>
                            </Card.Footer>
                          )}


                        </Card>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>


        <Modal.Footer size="lg">
          <Button variant="secondary" onClick={() => setModal(false)}>
            Fechar
          </Button>
          <div className="col-2 px-0  mb-2 me-3">
            <input type="number" name="num" className="form-control input-btn input-number" value={quantProd} min={1} max={50} onChange={handleQuantProd} />
          </div>

          <div className="shopping-cart  mb-2 me-3">
            <Button className="btn btn-primary" disabled={loading || (produto.tipo != "fixo" && saboresEscolhidos.length==0)} onClick={adicionarCarrinho}>
              <i className="fa fa-shopping-basket me-2" />
              adicionar
            </Button>
          </div>

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDetalhesProduto;