import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Modal } from "react-bootstrap";
import { api } from "../../../../../services/api";
import ExibirComplementosGrupo from "./ExibirComplementosGrupo";
import TituloPagina from "../../../../components/componentes/TituloPagina";
import ModalNome from "./modalNome";
import LoadingPage from "../../../../components/componentes/LoadingPage";
import ModalAddComp from "./modalAddComp";
import ModalAddGrupo from "./modalAddGrupo";

const GerenciarGrupos = ({ }) => {

  const [loading, setLoading]= useState(false);
  const [loadingComp, setLoadingComp]= useState(false);

  const [grupos, setGrupos] = useState([]);
  const [complementos, setComplementos] = useState([]);

  const [modalNome, setModalNome] = useState(false);
  const [modalAddGrupo, setModalAddGrupo] = useState(false);

  const [modalAddComp, setModalAddComp] = useState(false);
  const [modalAddSabor, setModalAddSabor] = useState(false);

  const [id_grupo, setIdGrupo] = useState(null);
  const [grupoSelect, setGrupoSelect] = useState(null);


	const pegarGrupos= async () => {    
	
    setLoading(true);
    const result = await api.pegarGrupos();			

    if(result.success){
      setGrupos(result.grupos);
    }else{
      swal("Oops", result.error, "error");
    }
    setLoading(false);
	}
  useEffect(() => {
    pegarGrupos();
  }, []); 



  const pegarComplementos= async (id) => {    
	
    setLoadingComp(true);
    const result = await api.pegarComplementos(id);			

    if(result.success){
      setComplementos(result.complementos);
    }else{
      swal("Oops", result.error, "error");
    }
    setLoadingComp(false);
	}


  
  const handleAccordionToggle = async (eventKey) => {
    if(eventKey){
      await pegarComplementos(eventKey);
    }
    setIdGrupo(eventKey);
  };

  const handleClickSpan = (event, item) => {
    event.stopPropagation(); // Impede que o Accordion abra/feche
    setGrupoSelect(item);
    setModalNome(true);
  };

  return (
    <>
      <TituloPagina titulo={"/Gerenciar Grupos"}></TituloPagina>
      <br></br>

      <div className="d-flex align-items-center justify-content-between mb-4">
        <Button variant="primary" disabled={loading} onClick={()=> setModalAddGrupo(true)}>
          <i className="fa fa-plus me-2" />
          Cadastrar Grupo
        </Button>
      </div>

      <Card>
        <Card.Body>
          {loading ? 
            (
              <LoadingPage></LoadingPage>              
            ):( grupos.length > 0 ? 
              (
                <Accordion onSelect={handleAccordionToggle} className="accordion accordion-primary-solid">
                  {grupos.map((item) => (
                    <>
                      <Accordion.Item eventKey={item.id_grupo}>
                        <Accordion.Header className="accordion-header">
                          <strong style={{ fontSize: '15px' }}>{item.nome}</strong>
                          <span className="btn-icon-end" onClick={(e) => handleClickSpan(e, item)}>
                            <i className="fa fa-edit" />
                          </span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Card>
                            <Card.Body>
                              {loadingComp ? (
                                <LoadingPage></LoadingPage>              
                              ):(
                                <div>
                                  <ExibirComplementosGrupo id_grupo={id_grupo} complementos={complementos} pegarComplementos={pegarComplementos} />
                                </div>
                              )}
                            </Card.Body>
    
                            <Card.Footer>
                              <Button variant="primary" disabled={loading} 
                                onClick={
                                  () => item.tipo == 'comp' ? setModalAddComp(true) : setModalAddSabor(true)
                                }>
                                <i className="fa fa-plus me-2" />
                                {item.tipo == 'comp' ? 'Adicionar Item' : 'Adicionar Sabor'}
                              </Button>
                            </Card.Footer>
                          </Card>
                        
                          </Accordion.Body>
                      </Accordion.Item>
                    </>
                  ))}
                </Accordion>
              ):(
                <div>
                  voce não tem grupos cadastrados
                </div>
              )
            )
          }
        </Card.Body>
      </Card>

      {modalNome && (
        <ModalNome setModal={setModalNome} grupoSelect={grupoSelect} grupos={grupos} setGrupos={setGrupos}></ModalNome>
      )}

      {modalAddComp && (
        <ModalAddComp setModal={setModalAddComp} id_grupo={id_grupo} pegarComplementos={pegarComplementos}></ModalAddComp>
      )}

      {modalAddGrupo && (
        <ModalAddGrupo setModal={setModalAddGrupo} grupos={grupos} setGrupos={setGrupos}></ModalAddGrupo>
      )}

    </>
  );
};

export default GerenciarGrupos;