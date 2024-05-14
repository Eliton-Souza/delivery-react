import React, { Fragment, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import HorariosGrid from "./horariosGrid";
import { api } from "../../../../services/api";

const EditarHorario = ({ setModal, horariosLoja, setHorariosLoja }) => {

    const [loading, setLoading] = useState(false);
    const [horarios, setHorarios] = useState(horariosLoja);

    const changeHorarios = (diaSemana, campo, valor) => {
        setHorarios((prevState) =>
            prevState.map((horario) => {
                if (horario.diaSemana == diaSemana) {
                    return { ...horario, [campo]: valor };
                }
                return horario; // Mantém os outros horários imutáveis
            })
        );
    };

    const validarHorarios = async () => {
        
        const horariosValidados = horarios.map((horario) => {
          const { abertura1, fechamento1, abertura2, fechamento2 } = horario;
    
          if (!abertura1 || !fechamento1) {
            if(abertura2 && fechamento2){
                return { ...horario, abertura1: abertura2, fechamento1: fechamento2, abertura2: null, fechamento2: null };
            }
            return { ...horario, abertura1: null, fechamento1: null };
          }
      
          if (!abertura2 || !fechamento2) {
            return { ...horario, abertura2: null, fechamento2: null };
          }
      
          return horario;
        });
      
        setHorarios(horariosValidados);
        return horariosValidados;
    };
      
    

    const salvarHorarios= async () => {     
    
        setLoading(true);
        const hValidados= await validarHorarios();
        const result = await api.editarHorarios(hValidados);			

        if(result.success){
            
            setHorariosLoja(hValidados);
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
                            <HorariosGrid horarios={horariosLoja.find(horario => horario.diaSemana == "segunda-feira")} setHorario={changeHorarios} diaSemana={"Segunda-Feira"}></HorariosGrid>
                        </div>

                        <div className="col-12 col-sm-auto col-lg-6 mb-3 d-flex justify-content-center align-items-center">
                            <HorariosGrid horarios={horariosLoja.find(horario => horario.diaSemana == "terça-feira")} setHorario={changeHorarios} diaSemana={"Terça-Feira"}></HorariosGrid>
                        </div>  
                    </div>

                    <hr className="col-12"></hr>
                    
                    <div className="row">
                        <div className="col-12 col-sm-auto col-lg-6 mb-3 d-flex justify-content-center align-items-center">
                        <HorariosGrid horarios={horariosLoja.find(horario => horario.diaSemana == "quarta-feira")} setHorario={changeHorarios} diaSemana={"Quarta-Feira"}></HorariosGrid>
                        </div>

                        <div className="col-12 col-sm-auto col-lg-6 mb-3 d-flex justify-content-center align-items-center">
                        <HorariosGrid horarios={horariosLoja.find(horario => horario.diaSemana == "quinta-feira")} setHorario={changeHorarios} diaSemana={"Quinta-Feira"}></HorariosGrid>
                        </div>  
                    </div>

                    <hr className="col-12"></hr>

                    <div className="row">
                        <div className="col-12 col-sm-auto col-lg-6 mb-3 d-flex justify-content-center align-items-center">
                        <HorariosGrid horarios={horariosLoja.find(horario => horario.diaSemana == "sexta-feira")} setHorario={changeHorarios} diaSemana={"Sexta-Feira"}></HorariosGrid>
                        </div>

                        <div className="col-12 col-sm-auto col-lg-6 mb-3 d-flex justify-content-center align-items-center">
                        <HorariosGrid horarios={horariosLoja.find(horario => horario.diaSemana == "sábado")} setHorario={changeHorarios} diaSemana={"Sábado"}></HorariosGrid>
                        </div>  
                    </div>

                    <hr className="col-12"></hr>

                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-12 col-lg-6 mb-3">
                        <HorariosGrid horarios={horariosLoja.find(horario => horario.diaSemana == "domingo")} setHorario={changeHorarios} diaSemana={"Domingo"}></HorariosGrid>
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