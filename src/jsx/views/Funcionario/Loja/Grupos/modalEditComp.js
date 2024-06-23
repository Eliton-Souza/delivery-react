import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TextoGenerico from "../../../../components/componentes/textoGenerico";
import { toast } from "react-toastify"
import { api } from "../../../../../services/api";
import Preco from "../../../../components/componentes/preco";
import Switch from "../../../../components/componentes/botaoSwtich";

const ModalEditComp = ({ item, setModal, id_grupo, pegarComplementos }) => {

   const [nome, setNome] = useState(item.nome);
   const [preco, setPreco] = useState(item.preco);
   const [status, setStatus] = useState(item.status == 1 ? true : false);

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
      const result = await api.editarComplemento(item.id_complemento, nome, preco, status);			
  
      if(result.success){

        pegarComplementos(id_grupo);
         
        swal("Sucesso!", "Item editado com sucesso", "success");
        toast.success("✔️ " + "Item editado com sucesso", {
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
            <Modal.Title>Editar item do grupo</Modal.Title>
         </Modal.Header>

         <Modal.Body>
            <div className="row">
               <div className="form-group mb-3 col-md-5">                     
                  <label className="text-label">
                     <strong>Nome
                        <span className="text-danger"> *</span>
                     </strong>
                  </label>
                  
                  <TextoGenerico
                     changeTexto={setNome} valor={nome} campo={"Nome"} placeholder={"Ex: 250g Bacon"} changeErro={setNomeErro} desabilitado={false}>                                 
                  </TextoGenerico>
               </div>

               <div className="form-group mb-3 col-md-4">                     
                  <label className="text-label">
                     <strong>Preço
                        <span className="text-danger"> *</span>
                     </strong>
                  </label>
                  
                  <Preco
                     setPreco={setPreco} valor={(item.preco).replace('.', ',')} placeholder={"R$ 0,00"} changeErro={setPrecoErro} desabilitado={false}>                                 
                  </Preco>
               </div>      

               <div className="form-group mb-3 col-md-3">                     
                  <label className="text-label">
                     <strong>Status
                        <span className="text-danger"> *</span>
                     </strong>
                  </label>
                  
                  <Switch checked={status} setChecked={setStatus} />
               </div>  
            </div>
         </Modal.Body>

         <Modal.Footer size="lg">
            <Button variant="dark" onClick={() => setModal(false)}>
               Fechar
            </Button>
         
            <Button variant="primary" disabled={loading || erro || !nome || !preco} onClick={()=> salvar()}>
               <i className="fa fa-save me-2" />
               Salvar
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ModalEditComp;