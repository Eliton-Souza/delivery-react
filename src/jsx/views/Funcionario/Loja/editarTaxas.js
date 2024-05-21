import React, { Fragment, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import Taxa from "../../../components/componentes/taxa";
import { useUsuario } from "../../../../context/UsuarioContext";

const EditarTaxas = ({ setModal }) => {

    const { usuario } = useUsuario();

    const [loading, setLoading] = useState(false);
    const [taxas, setTaxas] = useState([]);
    const [erro, setErro] = useState([]);

    const changeErro = (bairro, valor) => {
        setErro((prevState) =>
            prevState.map((item) => {
                if (item.bairro == bairro) {
                    return { ...item, erro: valor };
                }
                return item; // Mantém os outros itens imutáveis
            })
        );  
    };
    
    const changeTaxas = (bairro, valor) => {
        setTaxas((prevState) =>
            prevState.map((item) => {
                if (item.bairro == bairro) {
                    return { ...item, taxa: valor };
                }
                return item; // Mantém as outras taxas imutáveis
            })
        );  
    };

    const pegarTaxasLoja= async () => {    
	
        if(usuario.id_funcionario){
    
            setLoading(true);
            const resultDados = await api.pegarTaxasEntrega();			
    
            if(resultDados.success){
                setTaxas(resultDados.taxas);

                const copiaTaxas = resultDados.taxas.map((taxa) => {
                    return {
                      bairro: taxa.bairro,
                      erro: false,
                    }
                });
                setErro(copiaTaxas);
            }else{
              swal("Oops", resultDados.error, "error");
            }
            setLoading(false);
        }
        else{
          navigate('/logout');
        }
    }    
        
    useEffect(() => {
        pegarTaxasLoja();
    }, []); 
      
    

    const salvarTaxas= async () => {     
    
        setLoading(true);
        const result = await api.editarTaxas(taxas);			

        if(result.success){            
            setModal(false);   			

            swal("Sucesso!", "Taxas de entrega atualizadas com sucesso", "success");
            toast.success("✔️ " + "Taxas de entrega atualizadas com sucesso", {
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
        <Fragment>
            <Card>
                <Card.Body>
                    {taxas && (           
                        <div className='row'>
                        {taxas.map((item, index) => (
                            <div key={index} className="col-12 col-sm-auto col-lg-6 mb-3 d-flex align-items-center">
                                <Taxa setTaxa={changeTaxas} valor={item.taxa} bairro={item.bairro} placeholder={"Preço"} changeErro={changeErro} desabilitado={loading}></Taxa>                
                            </div>
                        ))}
                        </div>    
                    )}   
                </Card.Body>

                <Card.Footer className="d-flex justify-content-end">
                    <Button variant="success" disabled={loading || erro.find(err => err.erro == true)} onClick={() => salvarTaxas()}>
                        Salvar
                    </Button>
                </Card.Footer>
            </Card>
        </Fragment>
    );
};

export default EditarTaxas;