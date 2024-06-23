import React, { Fragment, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { api } from "../../../../../services/api";
import { toast } from "react-toastify";
import ModalEditComp from "./modalEditComp";

const ExibirComplementosGrupo = ({ id_grupo, complementos, pegarComplementos }) => {    

    const [modalEditComp, setModalEditComp] = useState(false);
    const [itemEdit, setItemEdit] = useState(null);

    const deletar= async (id_complemento) => {    
	
        const result = await api.deletarComplemento(id_complemento);
      
        if(result.success){
            swal("Feito!", "Complemento deletado com sucesso", "success");
            toast.success("✔️ " + "Complemento deletado com sucesso", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
            });

            pegarComplementos(id_grupo);
        }else{
          swal("Oops", result.error, "error");        
        }
      }
    
    const deletarComplemento= (id_complemento) => {    
        swal({
          title: "Deseja realmente excluir este complemento?",
          text: "Atenção! Esta ação é irrevesível",
          icon: "warning",
          buttons: {
            cancel: "Cancelar",
            confirm: "Deletar"
          },
          dangerMode: true,
        }).then((deletou) => {
            if (deletou) {
                deletar(id_complemento);		
            } else {
                swal("Sua lista de complementos não foi alterada");
            }
        })
    }
      
    return (
        <Fragment>
            <Table responsive hover>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>#</strong>
                    </th>
                    <th>
                      <strong>NOME</strong>
                    </th>
                    <th>
                      <strong>PREÇO</strong>
                    </th>
                    <th>
                      <strong>STATUS</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                    {complementos.map((item, index) => (
                        <tr>
                            <td>
                                <strong>{index+1}</strong>
                            </td>
                            <td>
                                <div className="card-title card-intro-title mb-1">
                                    {item.nome}
                                </div>
                            </td>
                            <td>
                                <div className="card-title card-intro-title mb-1">
                                    {(item.preco).replace('.', ',')}
                                </div>
                            </td>
                            <td>
                                {item.status == 1 ? (
                                    <div className="d-flex align-items-center">
                                        <i className="fa fa-circle text-success me-1"></i>{" "}
                                        <div className="card-title card-intro-title mb-1">
                                           Ativo
                                        </div>
                                    </div>
                                ):(
                                    <div className="d-flex align-items-center">
                                        <i className="fa fa-circle text-danger me-1"></i>{" "}
                                        <div className="card-title card-intro-title mb-1">
                                           Suspenso
                                        </div>
                                    </div>
                                )}
                            </td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="success"
                                        className="light sharp i-false"
                                    >
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"></rect>
                                            <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                                            <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                                            <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                                        </g>
                                    </svg>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={()=> {setItemEdit(item); setModalEditComp(true)}}>Editar</Dropdown.Item>
                                        <Dropdown.Item onClick={()=> deletarComplemento(item.id_complemento)}>Excluir</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {modalEditComp && (
                <ModalEditComp item={itemEdit} setModal={setModalEditComp} id_grupo={id_grupo} pegarComplementos={pegarComplementos}></ModalEditComp>
            )}

        </Fragment> 
    );
};

export default ExibirComplementosGrupo;