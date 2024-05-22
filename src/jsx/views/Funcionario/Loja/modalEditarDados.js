import React, { useState } from "react";
import { Accordion, Button, Card, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import noImage from '../../../../images/noImage.png';
import EditarFoto from "./editarFoto";
import ModalCrop from "./modalCrop";
import TextoGenerico from "../../../components/componentes/textoGenerico";
import { api } from "../../../../services/api";
import EditarHorario from "./editarHorario";
import EditarTaxas from "./editarTaxas";

const ModalEditarDados = ({ dados, modal, setModal }) => {

  const { detalhes, setDetalhes, imagens, setImagens, horariosLoja, setHorariosLoja, tempoEntrega, setTempoEntrega } = dados;

  const [nome, setNome] = useState(detalhes.nome);
  const [contato, setContato] = useState(detalhes.contato);

  const [modalCrop, setModalCrop] = useState(false);
  const [tipo, setTipo] = useState(null);

  const [nomeErro, setNomeErro] = useState(false);
  const [contatoErro, setContatoErro] = useState(false);

  const [loading, setLoading] = useState(false);

  const [taxas, setTaxas] = useState(false);



  const salvarDetalhes= async () => {     
      
    setLoading(true);
    const result = await api.editarNomeContato(nome, contato);			

    if(result.success){
      setDetalhes({ 
        nome: nome,
        contato: contato,
      });

      setModal(false);   			

      swal("Sucesso!", "Nome e WhatsApp atualizados com sucesso", "success");
      toast.success("✔️ " + "Nome e WhatsApp atualizados com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      });
    }else{
      swal("Oops", result.error, "error");
    }
    setLoading(false);
  }


  const handleAccordionSelect = (eventKey) => {
    // Aqui você pode colocar a lógica que deseja executar quando o item do Accordion for clicado
   alert('Item do Accordion selecionado:', eventKey);
  };

  return (
    <>
      <Modal show={modal && !modalCrop} onHide={() => { setModal(false) }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar dados da Loja</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Accordion className="accordion accordion-primary-solid" defaultActiveKey="0">
            
              <Accordion.Item key={1} eventKey={1}>
                <Accordion.Header className="accordion-header">
                  <strong style={{ fontSize: '15px' }}>Foto de Perfil e Capa</strong>
                </Accordion.Header>

                <Accordion.Body>
                  <Card>
                    <Card.Body>
                      <ul>
                        <li className="mt-0" key={1}>
                          <EditarFoto 
                            linkImagem={imagens.capa} noImage={noImage} tipo={"capa"} setTipo={setTipo} setModalCrop={setModalCrop} titulo={"Capa"}>
                          </EditarFoto>
                        </li>

                        <hr/>

                        <li className="mt-0" key={2}>
                          <EditarFoto 
                            linkImagem={imagens.logo} noImage={noImage} tipo={"logo"} setTipo={setTipo} setModalCrop={setModalCrop} titulo={"Perfil"}>
                          </EditarFoto>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>


              <Accordion.Item key={2} eventKey={2}>
                <Accordion.Header className="accordion-header">
                  <strong style={{ fontSize: '15px' }}>Nome e Contato</strong>
                </Accordion.Header>

                <Accordion.Body>
                  <Card>
                    <Card.Body>
                      <ul>
                        <li className="mt-0" key={1}> 
                          <div className="row">
                            <div className="form-group mb-3 col-md-5">                     
                              <label className="text-label">
                                <strong>Nome da empresa
                                    <span className="text-danger"> *</span>
                                </strong>
                              </label>
                                
                              <TextoGenerico
                                changeTexto={setNome} valor={nome} campo={"Nome"} placeholder={"Nome da empresa"} changeErro={setNomeErro} desabilitado={false}>                                 
                              </TextoGenerico>
                            </div>  

                            <div className="form-group mb-3 col-md-5">                     
                              <label className="text-label">
                                <strong>Número de Whatsapp
                                    <span className="text-danger"> *</span>
                                </strong>
                              </label>
                          
                              <TextoGenerico
                                changeTexto={setContato} valor={contato} campo={"WhatsApp"} placeholder={"WhatsApp"} changeErro={setContatoErro} desabilitado={false}>                                 
                              </TextoGenerico>
                            </div>

                            <div className="mb-3 col-md-2">
                              <Button className="mr-2 mt-4" variant="success" disabled={loading || nomeErro || contatoErro} onClick={() => salvarDetalhes()}>
                                Salvar
                              </Button>
                            </div>                            
                          </div>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item key={3} eventKey={3}>
                <Accordion.Header className="accordion-header">
                  <strong style={{ fontSize: '15px' }}>Horário de Funcionamento</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <EditarHorario setModal={setModal} horariosLoja={horariosLoja} setHorariosLoja={setHorariosLoja}></EditarHorario>
                </Accordion.Body>
              </Accordion.Item>

              
            <Accordion onSelect={()=> setTaxas(true)}>
              <Accordion.Item key={4} eventKey={4}>
                <Accordion.Header className="accordion-header">
                  <strong style={{ fontSize: '15px' }}>Entrega</strong>
                </Accordion.Header>

                <Accordion.Body>
                  {taxas && (                  
                    <EditarTaxas setModal={setModal} tempoMain={tempoEntrega} setTempoMain={setTempoEntrega}></EditarTaxas>
                  )}
                  </Accordion.Body>
                  
              </Accordion.Item>
            </Accordion>


             

          </Accordion>   
        </Modal.Body>

        <Modal.Footer size="lg">
          <Button variant="secondary" onClick={() => setModal(false)}>
            Fechar
          </Button>
         
        </Modal.Footer>
      </Modal>



      {modalCrop && (
        <ModalCrop linkImagem={imagens[tipo]} setImagens={setImagens} setModal={setModal} tipo={tipo}/>
      )}
      
    </>
  );
};

export default ModalEditarDados;