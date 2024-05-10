import React, { Fragment, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import HorariosGrid from "./horariosGrid";
import { api } from "../../../../services/api";

const EditarHorario = ({ setModal, horariosLoja, setHorariosLoja }) => {

    const [loading, setLoading] = useState(false);

    const [horarios, setHorarios] = useState([
        { diaSemana: 'Domingo', abertura1: null, fechamento1: null, abertura2: null, fechamento2: null },
        { diaSemana: 'Segunda-Feira', abertura1: null, fechamento1: null, abertura2: null, fechamento2: null },
        { diaSemana: 'Terça-Feira', abertura1: null, fechamento1: null, abertura2: null, fechamento2: null },
        { diaSemana: 'Quarta-Feira', abertura1: null, fechamento1: null, abertura2: null, fechamento2: null },
        { diaSemana: 'Quinta-Feira', abertura1: null, fechamento1: null, abertura2: null, fechamento2: null },
        { diaSemana: 'Sexta-Feira', abertura1: null, fechamento1: null, abertura2: null, fechamento2: null },
        { diaSemana: 'Sábado', abertura1: null, fechamento1: null, abertura2: null, fechamento2: null },
    ]);

    const changeHorarios = (diaSemana, campo, valor) => {
        setHorarios((prevState) =>
            prevState.map((horario) => {
                if (horario.diaSemana === diaSemana) {
                    return { ...horario, [campo]: valor };
                }
                return horario; // Mantém os outros horários imutáveis
            })
        );
    };

    const transformarHorarios = async () => {
        const novoHorarios = [];
        
        horarios.forEach(horario => {
      
             // Verifica se há abertura1 e fechamento1 e cria nova linha
            if (horario.abertura1 !== null && horario.fechamento1 !== null) {
                novoHorarios.push({
                    diaSemana: horario.diaSemana,
                    abertura: horario.abertura1,
                    fechamento: horario.fechamento1
                });
            }

             // Verifica se há abertura2 e fechamento2 e cria nova linha
             if (horario.abertura2 !== null && horario.fechamento2 !== null) {
                novoHorarios.push({
                    diaSemana: horario.diaSemana,
                    abertura: horario.abertura2,
                    fechamento: horario.fechamento2
                });
            }
        });
      
        return novoHorarios;
      };
      

      const salvarHorarios= async () => {     
      
        setLoading(true);

        const horariosEstruturados= await transformarHorarios();
        const result = await api.cadastrarHorarios(horariosEstruturados);			
    
        if(result.success){
            /*setDetalhes({ 
            nome: nome,
            contato: contato,
          });*/
    
          setModal(false);   			
    
          swal("Sucesso!", "Horários de funcionamento atualizados com sucesso", "success");
          toast.success("✔️ " + "Horários de funcionamento atualizados com sucesso", {
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
                        
                    <div className="row">
                        <div className="col-12 col-sm-auto col-lg-6 mb-3 d-flex justify-content-center align-items-center">
                            <HorariosGrid horarios={horarios} setHorario={changeHorarios} diaSemana={"Segunda-Feira"}></HorariosGrid>
                        </div>

                        <div className="col-12 col-sm-auto col-lg-6 mb-3 d-flex justify-content-center align-items-center">
                            <HorariosGrid horarios={horarios} setHorario={changeHorarios} diaSemana={"Terça-Feira"}></HorariosGrid>
                        </div>  
                    </div>
                    <hr className="col-12"></hr>
                    
                    <div className="row">
                        <div className="col-12 col-sm-auto col-lg-6 mb-3 d-flex justify-content-center align-items-center">
                            <HorariosGrid horarios={horarios} setHorario={changeHorarios} diaSemana={"Quarta-Feira"}></HorariosGrid>
                        </div>

                        <div className="col-12 col-sm-auto col-lg-6 mb-3 d-flex justify-content-center align-items-center">
                            <HorariosGrid horarios={horarios} setHorario={changeHorarios} diaSemana={"Quinta-Feira"}></HorariosGrid>
                        </div>  
                    </div>
                    <hr className="col-12"></hr>

                    <div className="row">
                        <div className="col-12 col-sm-auto col-lg-6 mb-3 d-flex justify-content-center align-items-center">
                            <HorariosGrid horarios={horarios} setHorario={changeHorarios} diaSemana={"Sexta-Feira"}></HorariosGrid>
                        </div>

                        <div className="col-12 col-sm-auto col-lg-6 mb-3 d-flex justify-content-center align-items-center">
                            <HorariosGrid horarios={horarios} setHorario={changeHorarios} diaSemana={"Sábado"}></HorariosGrid>
                        </div>  
                    </div>
                    <hr className="col-12"></hr>

                
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-12 col-lg-6 mb-3">
                            <HorariosGrid horarios={horarios} setHorario={changeHorarios} diaSemana={"Domingo"}></HorariosGrid>
                        </div>
                    </div>

                </Card.Body>

                <Card.Footer className="d-flex justify-content-end">
                    <Button variant="success" disabled={loading} onClick={() => salvarHorarios()}>
                        Salvar
                    </Button>
                </Card.Footer>
            </Card>
        </Fragment>
    );
};

export default EditarHorario;