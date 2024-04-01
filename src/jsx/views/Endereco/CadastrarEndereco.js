import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TextoGenerico from "../../components/componentes/textoGenerico";
import MapContainer from "../../components/componentes/MapContainer";

const CadastrarEndereco = ({ setModal }) => {
   const [permissao, setPermissao] = useState(false);
   const [estado, setEstado] = useState("AM");
   const [cidade, setCidade] = useState("Boca do Acre");
   const [bairro, setBairro] = useState(null);
   const [rua, setRua] = useState(null);
   const [numero, setNumero] = useState(null);
   const [semNumero, setSemNumero] = useState(false);
   const [referencia, setReferencia] = useState(null);
   const [descricao, setDescricao] = useState(null);

   const [erro, setErro] = useState(true);
   const [estadoErro, setEstadoErro] = useState(false);
   const [cidadeErro, setCidadeErro] = useState(false);
   const [bairroErro, setBairroErro] = useState(true);
   const [ruaErro, setRuaErro] = useState(true);
   const [numeroErro, setNumeroErro] = useState(true);
   const [referenciaErro, setReferenciaErro] = useState(true);
   const [descricaoErro, setDescricaoErro] = useState(true);

   const [loading, setLoading] = useState(null);

   useEffect(() => {
      if(estadoErro || cidadeErro || bairroErro || ruaErro || numeroErro || referenciaErro || descricaoErro){
         setErro(true);
      }else{
         setErro(false);
      }
   }, [estadoErro, cidadeErro, bairroErro, ruaErro, numeroErro, referenciaErro, descricaoErro]);


   return (
    

      <Modal show={true} onHide={() => { setModal(false) }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cadrastre um novo endereço!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
         <div className="row">
            <div className="col-xl-12">
               <div className="card-body">
                  <div className="basic-form">
                  
                     <form >
                        <div className="row">
                           <div className="form-group mb-3 col-md-6">                     
                              <label className="text-label">
                                 <strong>Estado
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <TextoGenerico
                                 changeTexto={setEstado} campo={"Estado"} placeholder={"Amazonas"} changeErro={setEstadoErro} desabilitado={true}>                                 
                              </TextoGenerico>
                           </div>

                           <div className="form-group mb-3 col-md-6">                     
                              <label className="text-label">
                                 <strong>Cidade
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <TextoGenerico
                                 changeTexto={setCidade} campo={"Cidade"} placeholder={"Boca do Acre"} changeErro={setCidadeErro} desabilitado={true}>                                 
                              </TextoGenerico>
                           </div>                              
                        </div>


                        <div className="row">
                           <div className="form-group mb-3 col-md-4">                     
                              <label className="text-label">
                                 <strong>Bairro
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <TextoGenerico
                                 changeTexto={setBairro} campo={"Bairro"} placeholder={"Digite seu bairro"} changeErro={setBairroErro} desabilitado={false}>                                 
                              </TextoGenerico>
                           </div>

                           <div className="form-group mb-3 col-md-4">                     
                              <label className="text-label">
                                 <strong>Rua
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <TextoGenerico
                                 changeTexto={setRua} campo={"Rua"} placeholder={"Digite sua Rua"} changeErro={setRuaErro} desabilitado={false}>                                 
                              </TextoGenerico>
                           </div>  

                           <div className="form-group mb-3 col-md-4">                     
                              <label className="text-label">
                                 <strong>Número
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                           
                              <TextoGenerico
                              changeTexto={setNumero} campo={"Número"} placeholder={"Número"} changeErro={setNumeroErro} desabilitado={semNumero}>                                 
                              </TextoGenerico>
         
                           </div>                            
                        </div>


                        <div className="row">
                           <div className="form-group mb-3 col-md-6">                     
                              <label className="text-label">
                                 <strong>Ponto de Referência
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <textarea name="textarea" id="textareaReferencia" cols={30} rows={5} className="form-control bg-transparent" placeholder="Ex: Próximo a prefeitura" defaultValue={""}/>
                        
                           </div>

                           <div className="form-group mb-3 col-md-6">                     
                              <label className="text-label">
                                 <strong>Complemento
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <textarea name="textarea" id="textareaDescricao" cols={30} rows={5} className="form-control bg-transparent" placeholder="Ex: Casa do fulado que trabalha na prefeitura, casa com muro na cor branca e portão de ferro..." defaultValue={""}/>
                        
                           </div>                              
                        </div>

                        
                        <div className="row mt-4">
                           <MapContainer permissao={permissao} setPermissao={setPermissao}></MapContainer>  
                           
                           <div className="mb-1"></div>

                           <Button variant="info"  onClick={() => { setPermissao(!permissao) }}>
                              <i className="fa fa-map-marker me-2" />
                              {permissao? 'Remover Localização' : 'Adicionar Localização'}
                           </Button>     
                        </div>          
                     </form>

                  </div>
               </div>
            </div>
         </div>
        </Modal.Body>

        <Modal.Footer size="lg">
            <Button variant="dark" onClick={() => setModal(false)}>
               Fechar
            </Button>
         
            <Button variant="primary" disabled={loading || erro}>
               <i className="fa fa-plus me-2" />
               Cadastrar
            </Button>
        </Modal.Footer>

      </Modal>
   );
};

export default CadastrarEndereco;