import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TextoGenerico from "../../../../components/componentes/textoGenerico";
import { toast } from "react-toastify"
import { api } from "../../../../../services/api";

const CadastrarCategoria = ({ setModal, categorias, setCategorias }) => {

   const [nome, SetNome] = useState(null);
   const [erro, setErro] = useState(false);
   const [loading, setLoading] = useState(false);
   
   const cadastrar= async () => {     
     
      setLoading(true);
      const prioridade= Number(Math.max(...categorias.map(categoria => categoria.prioridade)) + 1);
      const result = await api.cadastrarCategoria(nome, prioridade);			
  
      if(result.success){

         const novaCategoria=  {
            "id_categoria": result.categoria.id_categoria,
            "nome": nome,
            "prioridade": prioridade,
            "Produtos": []
        }

         setCategorias([novaCategoria, ...categorias]);
         
         setModal(false);   			
         swal("Sucesso!", "Categoria cadastrada com sucesso", "success");
         toast.success("✔️ " + "Categoria cadastrada com sucesso", {
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
      <Modal show={true} onHide={() => { setModal(false) }} size="md">
         <Modal.Header closeButton>
            <Modal.Title>Cadrastre uma nova categoria de produtos!</Modal.Title>
         </Modal.Header>

         <Modal.Body>
            <label className="text-label">
               <strong>Nome
                  <span className="text-danger"> *</span>
               </strong>
            </label>
               
            <div className="form-group col-md-6">        
               <TextoGenerico
                  changeTexto={SetNome} campo={"Nome"} placeholder={"Nome da categoria"} changeErro={setErro} desabilitado={false}>                                 
               </TextoGenerico>
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

export default CadastrarCategoria;