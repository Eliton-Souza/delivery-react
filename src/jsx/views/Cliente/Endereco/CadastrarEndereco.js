import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TextoGenerico from "../../../components/componentes/textoGenerico";
import MapContainer from "../../../components/componentes/MapContainer";
import BairroFild from "../../../components/componentes/bairros";
import TextAreaGenericFild from "../../../components/componentes/textarea";
import { toast } from "react-toastify"
import { api } from "../../../../services/api";

const CadastrarEndereco = ({ setModal, enderecos, setEnderecos }) => {

   const [permissao, setPermissao] = useState(false);
   const [bairros, setBairros] = useState([]);
   
   const [estado, setEstado] = useState("AM");
   const [cidade, setCidade] = useState("Boca do Acre");
   const [id_bairro, setIdBairro] = useState(null);
   const [rua, setRua] = useState(null);
   const [numero, setNumero] = useState(null);
   const [referencia, setReferencia] = useState(null);
   const [descricao, setDescricao] = useState(null);
   const [latitude, setLatitude] = useState(null);
   const [longitude, setLongitude] = useState(null);

   const [erro, setErro] = useState(true);
   const [estadoErro, setEstadoErro] = useState(false);
   const [cidadeErro, setCidadeErro] = useState(false);
   const [id_bairroErro, setIdBairroErro] = useState(true);
   const [ruaErro, setRuaErro] = useState(true);
   const [numeroErro, setNumeroErro] = useState(true);
   const [referenciaErro, setReferenciaErro] = useState(true);
   const [descricaoErro, setDescricaoErro] = useState(true);

   const [loading, setLoading] = useState(false);

   useEffect(() => {
      console.log(erro);
      if(id_bairroErro || ruaErro || numeroErro || referenciaErro || descricaoErro){
         setErro(true);
      }else{
         setErro(false);
      }
   }, [id_bairroErro, ruaErro, numeroErro, referenciaErro, descricaoErro]);

   const cadastrar= async () => {     
      
      setLoading(true);
      const result = await api.cadastrarEndereco(estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude);			
  
      if(result.success){

         const novoBairro = bairros.find((bairro) => bairro.id_bairro == result.endereco.id_bairro);
         const nomeNovoBairro = novoBairro.nome;

         const novoEndereco = { ...result.endereco, bairro: nomeNovoBairro };
         setEnderecos([...enderecos, novoEndereco]);

         setModal(false);   			
         swal("Sucesso!", "Endereço cadastrado com sucesso", "success");
         toast.success("✔️ " + "Endereço cadastrado com sucesso", {
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
                              
                              <BairroFild changeIdBairro={setIdBairro} bairros={bairros} setBairros={setBairros} changeErro={setIdBairroErro} desabilitado={false}></BairroFild>
                           
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
                                 changeTexto={setNumero} campo={"Número"} placeholder={"Número"} changeErro={setNumeroErro} desabilitado={false}>                                 
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
                              
                              <TextAreaGenericFild
                                 changeTextArea={setReferencia} campo={"Ponto de Referência"} placeholder={"Ex: Próximo a prefeitura"} changeErro={setReferenciaErro} desabilitado={false}>
                              </TextAreaGenericFild>
                           </div>

                           <div className="form-group mb-3 col-md-6">                     
                              <label className="text-label">
                                 <strong>Complemento
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <TextAreaGenericFild
                                 changeTextArea={setDescricao} campo={"Complemento"} placeholder={"Ex: Casa do fulado que trabalha na prefeitura, casa com muro na cor branca e portão de ferro..."} changeErro={setDescricaoErro} desabilitado={false}>
                              </TextAreaGenericFild>
                           </div>                              
                        </div>

                        
                        <div className="row mt-4">
                           <MapContainer permissao={permissao} setPermissao={setPermissao} setLatitude={setLatitude} setLongitude={setLongitude}></MapContainer>  
                           
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
         
            <Button variant="primary" disabled={loading || erro} onClick={()=> cadastrar()}>
               <i className="fa fa-plus me-2" />
               Cadastrar
            </Button>
        </Modal.Footer>

      </Modal>
   );
};

export default CadastrarEndereco;