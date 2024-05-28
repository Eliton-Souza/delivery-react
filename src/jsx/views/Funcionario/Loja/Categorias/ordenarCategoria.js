import React, { useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from "react-toastify"
import { api } from "../../../../../services/api";

const OrdenarCategoria = ({ setModal, categorias, setCategorias }) => {

   const [loading, setLoading] = useState(false);
   const [itens, setItens] = useState(
      categorias.map(categoria => {
         const { Produtos, ...categoriaSemProdutos } = categoria;
         return categoriaSemProdutos;
       })
   );
   
   const salvar= async () => {   

      setLoading(true);
      const result = await api.editarPrioridadeCategoria(itens);			
  
      if(result.success){

         const updatedCategorias = categorias.map((categoria) => {
            const item = itens.find((item) => item.id_categoria == categoria.id_categoria);
            if (item) {
              return { ...categoria, prioridade: item.prioridade };
            }
            return categoria;
          });

         updatedCategorias.sort((a, b) => b.prioridade - a.prioridade);
      
         setCategorias(updatedCategorias);
         
         setModal(false);   			
         swal("Sucesso!", "Categorias reordenadas com sucesso", "success");
         toast.success("✔️ " + "Categorias reordenadas com sucesso", {
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

   
   const onDragEnd = (result) => {
      if (!result.destination) return;

      const reorderedItems = Array.from(itens);
      const [removed] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 0, removed);

      const tamanho= reorderedItems.length;

      const updatedItems = reorderedItems.map((item, index) => ({
         ...item,
         prioridade: tamanho - index
      }));

      setItens(updatedItems);
  };

   return (
      <Modal show={true} onHide={() => { setModal(false) }} size="md">

        <Modal.Header closeButton>
          <Modal.Title>Reordenar Categorias</Modal.Title>
        </Modal.Header>

         <Modal.Body>
            <DragDropContext onDragEnd={onDragEnd}>
               <Droppable droppableId="droppable">
                  {(provided) => (
                     <div {...provided.droppableProps} ref={provided.innerRef}>
                        {itens.map((item, index) => (
                        <Draggable key={item.id_categoria} draggableId={String(item.id_categoria)} index={index}>
                           {(provided) => (
                              <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                 ...provided.draggableProps.style,
                                 margin: '8px 0',
                                 padding: '8px',
                                 textAlign: 'center',
                                 cursor: 'pointer'
                              }}>

                                 <ListGroup.Item action active as="li">
                                    <strong>{index+1 +" - "+ item.nome}</strong>
                                 </ListGroup.Item>
                              </div>
                           )}
                        </Draggable>
                        ))}
                        {provided.placeholder}
                     </div>
                  )}
               </Droppable>
            </DragDropContext>
         </Modal.Body>

        <Modal.Footer size="lg">
            <Button variant="dark" onClick={() => setModal(false)}>
               Fechar
            </Button>
         
            <Button variant="primary" disabled={loading} onClick={()=> salvar()}>
               Salvar
            </Button>
        </Modal.Footer>
      </Modal>
   );
};

export default OrdenarCategoria;