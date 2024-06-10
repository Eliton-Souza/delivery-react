import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TextoGenerico from "../../../../components/componentes/textoGenerico";
import { toast } from "react-toastify"
import { api } from "../../../../../services/api";

const ModalNome = ({ setModal, grupoSelect, grupos, setGrupos }) => {

   const [novoNome, setNovoNome] = useState(grupoSelect.nome);
   const [erro, setErro] = useState(false);
   const [loading, setLoading] = useState(false);
   
   const salvar= async () => {     
     
      setLoading(true);
      const result = await api.editarGrupo(grupoSelect.id_grupo, novoNome);			
  
      if(result.success){

        setGrupos(grupos.map(item => 
          item.id_grupo == grupoSelect.id_grupo 
          ? { ...item, nome: novoNome } 
          : item
        ));
            			
        swal("Sucesso!", "Nome do grupo foi alterado com sucesso", "success");
        toast.success("✔️ " + "Nome do grupo foi alterado com sucesso", {
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
      <Modal show={true} onHide={() => { setModal(false) }} size="sm">
         <Modal.Header closeButton>
            <Modal.Title>Editar nome do grupo</Modal.Title>
         </Modal.Header>

         <Modal.Body>
            <label className="text-label">
               <strong>Nome
                  <span className="text-danger"> *</span>
               </strong>
            </label>
               
            <div className="form-group col-12">        
               <TextoGenerico
                  changeTexto={setNovoNome} valor={novoNome} campo={"Nome"} placeholder={"Nome do grupo"} changeErro={setErro} desabilitado={loading}>                                 
               </TextoGenerico>
            </div>
         </Modal.Body>

         <Modal.Footer size="lg">
            <Button variant="dark" onClick={() => setModal(false)}>
               Fechar
            </Button>
         
            <Button variant="primary" disabled={loading || erro} onClick={()=> salvar()}>
               <i className="fa fa-save me-2" />
               Salvar
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ModalNome;