import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TextoGenerico from "../../../../components/componentes/textoGenerico";
import { toast } from "react-toastify"
import { api } from "../../../../../services/api";
import TipoGrupoField from "../../../../components/componentes/tipoGrupo";

const ModalAddGrupo = ({ setModal, grupos, setGrupos }) => {

   const [nome, setNome] = useState(null);
   const [tipo, setTipo] = useState(null);

   const [erro, setErro] = useState(true);
   const [nomeErro, setNomeErro] = useState(true);
   const [tipoErro, setTipoErro] = useState(true);

   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if(nomeErro || tipoErro){
         setErro(true);
      }else{
         setErro(false);
      }
   }, [ nomeErro, tipoErro ]);
   
   const salvar= async () => {     
     
      setLoading(true);
      const result = await api.cadastrarGrupo(nome, tipo);			
  
      if(result.success){

         setGrupos([...grupos, result.grupo]);

         swal("Sucesso!", "Grupo cadastrado com sucesso", "success");
         toast.success("✔️ " + "Grupo cadastrado com sucesso", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
         });
        
         setModal(false);
      }else{
         swal("Oops", result.error, "error");
      }
      
      setLoading(false);
    }

   return (
      <Modal show={true} onHide={() => { setModal(false) }} size="md">
         <Modal.Header closeButton>
            <Modal.Title>Cadastre um novo grupo</Modal.Title>
         </Modal.Header>

         <Modal.Body>
            <div className="row">
               <div className="form-group mb-3 col-md-6">                     
                  <label className="text-label">
                     <strong>Nome
                        <span className="text-danger"> *</span>
                     </strong>
                  </label>
                  
                  <TextoGenerico
                     changeTexto={setNome} campo={"Nome"} placeholder={"Ex: Adicionais"} changeErro={setNomeErro} desabilitado={loading}>                                 
                  </TextoGenerico>
               </div>

               <div className="form-group mb-3 col-md-6">                     
                  <label className="text-label">
                     <strong>Tipo de grupo
                        <span className="text-danger"> *</span>
                     </strong>
                  </label>
                  
                  <TipoGrupoField
                     changeTipo={setTipo} changeErro={setTipoErro} desabilitado={loading}>
                  </TipoGrupoField>
               </div>                              
            </div>
         </Modal.Body>

         <Modal.Footer size="lg">
            <Button variant="dark" onClick={() => setModal(false)}>
               Fechar
            </Button>
         
            <Button variant="primary" disabled={loading || erro || !nome || !tipo} onClick={()=> salvar()}>
               <i className="fa fa-plus me-2" />
               Cadastrar
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ModalAddGrupo;