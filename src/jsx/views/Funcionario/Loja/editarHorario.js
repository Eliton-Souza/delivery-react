import React, { Fragment, useState } from "react";
import HorariosGrid from "./horariosGrid";

const EditarHorario = ({ }) => {

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
      
      
    return (
        <Fragment>
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
        </Fragment>
    );
};

export default EditarHorario;