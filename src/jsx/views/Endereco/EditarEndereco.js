import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TextoGenerico from "../../components/componentes/textoGenerico";
import BairroFild from "../../components/componentes/bairros";
import TextAreaGenericFild from "../../components/componentes/textarea";
import { toast } from "react-toastify"
import { api } from "../../../services/api";
import MapEditar from "../../components/componentes/MapEditar";

const EditarEndereco = ({ setModal, enderecoEdit, enderecos, setEnderecos }) => {

   const [permissao, setPermissao] = useState(false);
   const [bairros, setBairros] = useState([]);

   const [estado, setEstado] = useState("AM");
   const [cidade, setCidade] = useState("Boca do Acre");
   const [id_bairro, setIdBairro] = useState(enderecoEdit.id_bairro);
   const [rua, setRua] = useState(enderecoEdit.rua);
   const [numero, setNumero] = useState(enderecoEdit.numero);
   const [referencia, setReferencia] = useState(enderecoEdit.referencia);
   const [descricao, setDescricao] = useState(enderecoEdit.descricao);
   const [latitude, setLatitude] = useState(null);
   const [longitude, setLongitude] = useState(null);

   const [erro, setErro] = useState(true);
   const [estadoErro, setEstadoErro] = useState(false);
   const [cidadeErro, setCidadeErro] = useState(false);
   const [id_bairroErro, setIdBairroErro] = useState(false);
   const [ruaErro, setRuaErro] = useState(false);
   const [numeroErro, setNumeroErro] = useState(false);
   const [referenciaErro, setReferenciaErro] = useState(false);
   const [descricaoErro, setDescricaoErro] = useState(false);

   const [loading, setLoading] = useState(false);

   
   useEffect(() => {
      if (enderecoEdit.coordenadas) {
         const partes = enderecoEdit.coordenadas.split(',');
         setLatitude(Number (partes[0]));
         setLongitude(Number (partes[1]));
         setPermissao(true);
      }
   }, []);



   useEffect(() => {
      //console.log(erro);
      if(id_bairroErro || ruaErro || numeroErro || referenciaErro || descricaoErro){
         setErro(true);
      }else{
         setErro(false);
      }
   }, [id_bairroErro, ruaErro, numeroErro, referenciaErro, descricaoErro]);

   const editar= async () => {     
      
      setLoading(true);
      const result = await api.editarEndereco(enderecoEdit.id_endereco, estado, cidade, id_bairro, rua, numero, referencia, descricao, latitude, longitude);			
  
      if(result.success){

         const novoBairro = bairros.find((bairro) => bairro.id_bairro == result.endereco.id_bairro);
         const nomeNovoBairro = novoBairro.nome;
         const enderecoEditado = { ...result.endereco, bairro: nomeNovoBairro };

         const enderecoIndex = enderecos.findIndex((endereco) => endereco.id_endereco == enderecoEdit.id_endereco);
         const copiaEnderecos = [...enderecos];
         copiaEnderecos[enderecoIndex] = { ...enderecoEditado };
         setEnderecos(copiaEnderecos);


         setModal(false);   			
         swal("Sucesso!", "Endereço editado com sucesso", "success");
         toast.success("✔️ " + "Endereço editado com sucesso", {
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
          <Modal.Title>Edite seu endereço!</Modal.Title>
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
                                 changeTexto={setEstado} valor={"Amazonas"} campo={"Estado"} placeholder={"Amazonas"} changeErro={setEstadoErro} desabilitado={true}>                                 
                              </TextoGenerico>
                           </div>

                           <div className="form-group mb-3 col-md-6">                     
                              <label className="text-label">
                                 <strong>Cidade
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <TextoGenerico
                                 changeTexto={setCidade} valor={"Boca do Acre"} campo={"Cidade"} placeholder={"Boca do Acre"} changeErro={setCidadeErro} desabilitado={true}>                                 
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
                              
                              <BairroFild changeIdBairro={setIdBairro} valor={id_bairro} bairros={bairros} setBairros={setBairros} changeErro={setIdBairroErro} desabilitado={false}></BairroFild>
                           
                           </div>

                           <div className="form-group mb-3 col-md-4">                     
                              <label className="text-label">
                                 <strong>Rua
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <TextoGenerico
                                 changeTexto={setRua} valor={rua} campo={"Rua"} placeholder={"Digite sua Rua"} changeErro={setRuaErro} desabilitado={false}>                                 
                              </TextoGenerico>
                           </div>  

                           <div className="form-group mb-3 col-md-4">                     
                              <label className="text-label">
                                 <strong>Número
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                           
                              <TextoGenerico
                                 changeTexto={setNumero} valor={numero} campo={"Número"} placeholder={"Número"} changeErro={setNumeroErro} desabilitado={false}>                                 
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
                                 changeTextArea={setReferencia} valor={referencia} campo={"Ponto de Referência"} placeholder={"Ex: Próximo a prefeitura"} changeErro={setReferenciaErro} desabilitado={false}>
                              </TextAreaGenericFild>
                           </div>

                           <div className="form-group mb-3 col-md-6">                     
                              <label className="text-label">
                                 <strong>Complemento
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <TextAreaGenericFild
                                 changeTextArea={setDescricao} valor={descricao} campo={"Complemento"} placeholder={"Ex: Casa do fulado que trabalha na prefeitura, casa com muro na cor branca e portão de ferro..."} changeErro={setDescricaoErro} desabilitado={false}>
                              </TextAreaGenericFild>
                           </div>                              
                        </div>

                        
                        <div className="row mt-4">
                           {permissao && (
                              <MapEditar permissao={permissao} setPermissao={setPermissao} latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude}></MapEditar>
                           )}
                           <div className="mb-1"></div>

                           <Button variant= {permissao? "danger": "info"}  onClick={() => {
                              //setPermissao(!permissao);
                              if (permissao) {
                                 setLatitude(null);
                                 setLongitude(null);
                                 setPermissao(false);
                              }
                              else{
                                 setPermissao(true);
                              }}}
                           >
                              <i className={`fa ${permissao ? 'fa-remove' : 'fa-map-marker'} me-2`} />
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
         
            <Button variant="primary" disabled={loading || erro} onClick={()=> editar()}>
               <i className="fa fa-edit me-2" />
               Salvar
            </Button>
        </Modal.Footer>

      </Modal>
   );
};

export default EditarEndereco;