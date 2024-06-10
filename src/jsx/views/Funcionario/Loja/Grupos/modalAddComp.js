import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TextoGenerico from "../../../../components/componentes/textoGenerico";
import { toast } from "react-toastify"
import { api } from "../../../../../services/api";
import Preco from "../../../../components/componentes/preco";

const ModalAddComp = ({ setModal, id_grupo, setGrupos }) => {

   const [nome, setNome] = useState(null);
   const [preco, setPreco] = useState(null);

   const [erro, setErro] = useState(true);

   const [nomeErro, setNomeErro] = useState(true);
   const [precoErro, setPrecoErro] = useState(true);

   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if(nomeErro || precoErro){
         setErro(true);
      }else{
         setErro(false);
      }
   }, [ nomeErro, precoErro ]);
   
   const salvar= async () => {     
     
      setLoading(true);
      const result = await api.cadastrarComplemento(id_grupo, nome, preco);			
  
      if(result.success){

        //setar no main
         
        swal("Sucesso!", "Item adicionado ao grupo com sucesso", "success");
        toast.success("✔️ " + "Item adicionado ao grupo com sucesso", {
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
            <Modal.Title>Adicione um novo item ao grupo</Modal.Title>
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
                     changeTexto={setNome} campo={"Nome"} placeholder={"Ex: 250g Bacon"} changeErro={setNomeErro} desabilitado={false}>                                 
                  </TextoGenerico>
               </div>

               <div className="form-group mb-3 col-md-6">                     
                  <label className="text-label">
                     <strong>Preço
                        <span className="text-danger"> *</span>
                     </strong>
                  </label>
                  
                  <Preco
                     setPreco={setPreco} placeholder={"R$ 0,00"} changeErro={setPrecoErro} desabilitado={false}>                                 
                  </Preco>
               </div>                              
            </div>
         </Modal.Body>

         <Modal.Footer size="lg">
            <Button variant="dark" onClick={() => setModal(false)}>
               Fechar
            </Button>
         
            <Button variant="primary" disabled={loading || erro || !nome || !preco} onClick={()=> salvar()}>
               <i className="fa fa-plus me-2" />
               Cadastrar
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ModalAddComp;