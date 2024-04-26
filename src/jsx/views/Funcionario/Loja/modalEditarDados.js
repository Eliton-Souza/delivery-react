import React, { useState } from "react";
import { Accordion, Button, Card, Modal } from "react-bootstrap";
import noImage from '../../../../images/noImage.png';
import EditarFoto from "./editarFoto";
import ModalCrop from "./modalCrop";

const ModalEditarDados = ({ dados, setImagens, modal, setModal }) => {

  const [modalCrop, setModalCrop] = useState(false);
  const [tipo, setTipo] = useState(null);

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
                  <strong style={{ fontSize: '15px' }}>Imagens</strong>
                </Accordion.Header>

                <Accordion.Body>
                  <Card>
                    <Card.Body>
                      <ul>
                        <li className="mt-0" key={1}>     
                          <label className="ms-4">
                            <strong style={{ fontSize: '15px' }}>Logo da loja</strong>
                          </label>
                          
                          <EditarFoto 
                            linkImagem={dados.logo} noImage={noImage} tipo={"logo"} setTipo={setTipo} setModalCrop={setModalCrop}>
                          </EditarFoto>
                        </li>

                        <hr/>


                        <li className="mt-0" key={2}>     
                          <label className="ms-4">
                            <strong style={{ fontSize: '15px' }}>Capa da loja</strong>
                          </label>
                          
                          <EditarFoto 
                            linkImagem={dados.capa} noImage={noImage} tipo={"capa"} setTipo={setTipo} setModalCrop={setModalCrop}>
                          </EditarFoto>
                        </li>

                      </ul>
                    </Card.Body>

                    

                  </Card>
                    
                </Accordion.Body>
              </Accordion.Item>



              <Accordion.Item key={2} eventKey={2}>
                <Accordion.Header className="accordion-header">Nome, dados</Accordion.Header>
                <Accordion.Body>
                  
                  <Card>
                    <Card.Body>
                      <ul>
                  
                        <li key={1}>
                            
                          campo 1
                        </li>

                        <li key={2}>
                            
                          campo 2
                        </li>
                      </ul>
                    </Card.Body>
                    <Card.Footer>
                      botao de salvar
                    </Card.Footer>
                  </Card>
                    
                </Accordion.Body>
              </Accordion.Item>
            
          </Accordion>

                            


                  
        </Modal.Body>


        <Modal.Footer size="lg">
          <Button variant="secondary" onClick={() => setModal(false)}>
            Fechar
          </Button>
         

        </Modal.Footer>
      </Modal>



      {modalCrop && (
        <ModalCrop linkImagem={dados[tipo]} setImagens={setImagens} setModal={setModal} tipo={tipo}/>
      )}
      
    </>
  );
};

export default ModalEditarDados;