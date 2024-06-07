import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import noImage from '../../../../../images/noImage.png';
import TextoGenerico from "../../../../components/componentes/textoGenerico";
import TextAreaGenericFild from "../../../../components/componentes/textarea";
import { toast } from "react-toastify"
import { api } from "../../../../../services/api";
import Preco from "../../../../components/componentes/preco";
import CategoriaField from "../../../../components/componentes/categorias";
import ModalAddImagem from "./modalAddImagem";


const CadastrarProdutoSimples = ({ tipo, setStep }) => {

   const [nome, setNome] = useState(null);
   const [preco, setPreco] = useState(null);
   const [id_categoria, setIdCategoria] = useState(null);
   const [descricao, setDescricao] = useState(null);

   const [imagem, setImagem] = useState(null);
   const [linkImagem, setLinkImagem] = useState(null);
   const [modalImagem, setModalImagem] = useState(null);
   
   const [erro, setErro] = useState(true);

   const [nomeErro, setNomeErro] = useState(true);
   const [precoErro, setPrecoErro] = useState(true);
   const [id_categoriaErro, setIdCategoriaErro] = useState(true);
   const [descricaoErro, setDescricaoErro] = useState(false);

   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if(nomeErro || precoErro || id_categoriaErro || descricaoErro){
         setErro(true);
      }else{
         setErro(false);
      }
   }, [ nomeErro, precoErro, id_categoriaErro, descricaoErro]);



   const cadastrarProduto= async (link) => {     
      
      const result = await api.cadastrarProduto(nome, preco, tipo, id_categoria, link, descricao);		

      if(result.success){
         swal("Sucesso!", "Produto cadastrado com sucesso", "success");
         toast.success("✔️ " + "Produto cadastrado com sucesso", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
         });

         setStep(3);
      }
      else{
         swal("Oops", result.error, "error");
      }	
   }

   const cadastrar= async () => {     
      
      setLoading(true);
      if(imagem){
         const upload = await api.uploadFoto(imagem);

         if(upload.success){
            cadastrarProduto(upload.imageUrl);
         }
         else{
            swal("Oops", result.error, "error");
         }
      }
      else{
         cadastrarProduto(null);
      }
      setLoading(false);
   }

   return (      
      <>
         <Card>
            <Card.Body>
               <div className="row">
                  <div className="col-12">
                     <form >
                        <div className="row justify-content-center">
                           <div className="col-md-8 d-flex justify-content-center align-items-center">
                              <div className="d-flex justify-content-center align-items-center">
                                 <div className="mb-3">
                                       <img
                                          id={'saveImageFile_$'}
                                          src={linkImagem ?? noImage}
                                          alt={imagem ? imagem.name : 'Sem Imagem'}
                                          className="logo-image"
                                          style={{ width: '100%', height: 'auto' }}
                                       />
                                 </div>
                                 <div className="ms-3">
                                       <Button variant="primary" onClick={() => setModalImagem(true)}>
                                          <i className="fa fa-edit me-2" />
                                          Editar Imagem
                                       </Button>
                                 </div>
                              </div>
                           </div>
                        </div>


                        <div className="row">
                           <div className="form-group mb-3 col-md-6">                     
                              <label className="text-label">
                                 <strong>Nome
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <TextoGenerico
                                 changeTexto={setNome} campo={"Nome"} placeholder={"Ex: X-Bacon"} changeErro={setNomeErro} desabilitado={false}>                                 
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


                        <div className="row">
                           <div className="form-group col-md-6">                     
                              <label className="text-label">
                                 <strong>Categoria
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <CategoriaField 
                                 changeIdCategoria={setIdCategoria} changeErro={setIdCategoriaErro} desabilitado={loading}>
                              </CategoriaField>
                           </div>     

                           <div className="form-group col-md-6">                     
                              <label className="text-label">
                                 <strong>Descrição
                                    <span className="text-danger"> *</span>
                                 </strong>
                              </label>
                              
                              <TextAreaGenericFild
                                 changeTextArea={setDescricao} campo={"Descrição"} placeholder={"Ingredientes do produto como: Pão, hamburguer, queijo..."} changeErro={setDescricaoErro} desabilitado={false}>
                              </TextAreaGenericFild>
                           </div>                
                        </div>
                     </form>
                  </div>
               </div>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-end">
               <Button variant="dark" onClick={() => setStep(1)} className="me-2">
                  Voltar
               </Button>

               <Button variant="primary" disabled={loading || erro} onClick={() => cadastrar()}>
                  <i className="fa fa-plus me-2" />
                  Cadastrar
               </Button>
            </Card.Footer>
         </Card>

         {modalImagem && (
            <ModalAddImagem imagem={imagem} setImagem={setImagem} setLinkImagem={setLinkImagem} setModal={setModalImagem}/>
         )}
      </>
   );
};

export default CadastrarProdutoSimples;