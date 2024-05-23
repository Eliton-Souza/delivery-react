import React, { Fragment, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { api } from "../../../../services/api";
import Taxa from "../../../components/componentes/taxa";
import { useUsuario } from "../../../../context/UsuarioContext";
import LoadingPage from "../../../components/componentes/LoadingPage";
import TimePickerPicker from 'react-time-picker';
import Switch from "../../../components/componentes/botaoSwtich";

const EditarTaxas = ({ setModal, tempoMain, setTempoMain  }) => {

    const { usuario } = useUsuario();

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [taxas, setTaxas] = useState([]);
    const [erro, setErro] = useState([]);
    
    const [tempo, setTempo] = useState(tempoMain);
    const [check, setCheck] = useState(tempoMain ? true : false);
    
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

    useEffect(() => {
        if(!check){
            setTempo(null);
        }
    }, [check]);

    const pegarTaxasLoja= async () => {    
	
        if(usuario.id_funcionario){
    
            setLoading2(true);
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
            setLoading2(false);
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
        const result = await api.editarTaxas(taxas, tempo);			

        if(result.success){   
            setTempoMain(tempo);         
            setModal(false);   			

            swal("Sucesso!", "Taxas e tempo de entrega atualizados com sucesso", "success");
            toast.success("✔️ " + "Taxas e tempo de entrega atualizados com sucesso", {
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
                {loading2 && (
                    <Card.Body>
                        <LoadingPage></LoadingPage>
                    </Card.Body>
                )}
                
                {!loading2 && taxas && (
                    <>
                        <Card.Body>
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="row">
                                    <div className="col-8 col-sm-6 mb-3 d-flex justify-content-end align-items-center">
                                        <label className="text-label mb-1">
                                            <strong>Tempo de entrega
                                                <span className="text-danger"> *</span>
                                            </strong>
                                        </label>
                                    </div>
                                    <div className="col-1 espaco"></div> 
                                    <div className="col-1 mb-3 d-flex align-items-center justify-content-center">
                                        <Switch checked={check} setChecked={setCheck} />
                                    </div>
                                </div>

                                <div className="row picker-data">
                                    <div className="d-flex justify-content-center align-items-center">
                                        {check ? (
                                            <div className="color-time-picker style">
                                                <TimePickerPicker onChange={setTempo} value={tempo} openClockOnFocus={false} hourPlaceholder={"hh "} minutePlaceholder={" mm"}/>
                                            </div>
                                        ) : (
                                            <p className="mb-1 text-danger">
                                                Não realizando entregas no momento
                                            </p>
                                        )}            
                                    </div>            
                                </div>
                            </div>

                            <hr className="col-12"/>

                            <div className=" mb-3 d-flex justify-content-center align-items-center">
                                <label className="text-label mb-1">
                                    <strong>Taxas de entrega por bairro</strong>
                                </label>
                            </div>

                            <div className="row mt-4">
                                {taxas && taxas.map((item, index) => (
                                    <div key={index} className="col-12 col-sm-auto col-lg-6 mb-3 d-flex align-items-center">
                                        <Taxa setTaxa={changeTaxas} valor={item.taxa} bairro={item.bairro} placeholder={"Preço"} changeErro={changeErro} desabilitado={loading}/>           
                                    </div>
                                ))}
                            </div>    
                        </Card.Body>

                        <Card.Footer className="d-flex justify-content-end">
                            <Button
                                variant="success"
                                disabled={loading || erro.find(err => err.erro)}
                                onClick={() => salvarTaxas()}
                            >
                                Salvar
                            </Button>
                        </Card.Footer>
                    </>
                )}
            </Card>
        </Fragment>
    );
    
};

export default EditarTaxas;