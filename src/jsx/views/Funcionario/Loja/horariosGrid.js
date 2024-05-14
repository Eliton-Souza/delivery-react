import React, { Fragment, useEffect, useState } from "react";
import TimePickerPicker from 'react-time-picker';
import { Link } from "react-router-dom";
import Switch from "../../../components/componentes/botaoSwtich";


const HorariosGrid = ({horarios, setHorario, diaSemana}) => {

    const [abre1, setAbre1] = useState(horarios.abertura1);
    const [fecha1, setFecha1] = useState(horarios.fechamento1);

    const [abre2, setAbre2] = useState(horarios.abertura2);
    const [fecha2, setFecha2] = useState(horarios.fechamento2);

    const [check, setCheck] = useState(horarios.abertura1 || horarios.abertura2 ? true : false);
    const [addHorario, setAddHorario] = useState(false);    
    
    const removerCampo= (campo) => {
        if(campo == 1){
            setFecha1(null);
            setAbre1(null);
        }else{
            setAddHorario(false);
            setFecha2(null);
            setAbre2(null);
        }
    }

    useEffect(() => {
        if(!check){
            removerCampo(1);
            removerCampo(2);
        }
    }, [check]);
    

    useEffect(() => {
        setHorario(horarios.diaSemana, "abertura1", abre1 ? abre1.padEnd(8, ':00') : null);
    }, [abre1]);

    useEffect(() => {
        setHorario(horarios.diaSemana, "fechamento1", fecha1 ? fecha1.padEnd(8, ':00') : null);
    }, [fecha1]);

    useEffect(() => {
        setHorario(horarios.diaSemana, "abertura2", abre2 ? abre2.padEnd(8, ':00') : null);
    }, [abre2]);

    useEffect(() => {
        setHorario(horarios.diaSemana, "fechamento2", fecha2 ? fecha2.padEnd(8, ':00') : null);
    }, [fecha2]);


    return (
        <Fragment>
            <div className="row picker-data d-flex justify-content-center align-items-center">

                <div className="row">
                    <div className="col-6 mb-3 d-flex justify-content-center align-items-center">
                        <label className="text-label mb-1">
                            <strong>{diaSemana}</strong>
                        </label>
                    </div>
                    <div className="col-6 mb-3 d-flex align-items-center justify-content-center">
                        <Switch checked={check} setChecked={setCheck} />
                    </div>
                </div>

                <div className="row">
                    {check ? (
                        <>
                            <div className="row">
                                <div className="col-5 mb-3 d-flex justify-content-center align-items-center">
                                    <div className="color-time-picker style-1">
                                        <TimePickerPicker onChange={setAbre1} value={abre1} autoFocus={true}/>
                                    </div>
                                </div>
                                <div className="col-5 mb-3 d-flex justify-content-center align-items-center">  
                                    <div className="color-time-picker style-1">    
                                        <TimePickerPicker onChange={setFecha1} value={fecha1} minTime={abre1}/>
                                    </div>
                                </div>
                                <div className="col-2 mb-3 d-flex align-items-center justify-content-start">
                                    <i onClick={() => removerCampo(1)} className="fa-solid fa-xmark" style={{ color: '#ff0000', fontSize: '24px' }}></i>
                                </div>

                                {!addHorario &&(                        
                                    <Link to="#" className="col-12 text-primary">
                                        <p>
                                            <i className="fa-solid fa-plus ms-2"></i>
                                            <span onClick={() => setAddHorario(true)}> adicionar horário</span>
                                        </p>
                                    </Link>
                                )}
                            </div>

                            {addHorario && (
                                <div className="row">
                                    <div className="col-5 mb-3 d-flex justify-content-center align-items-center">
                                        <div className="color-time-picker style-1">
                                            <TimePickerPicker onChange={setAbre2} value={abre2} minTime={fecha1} autoFocus={true}/>
                                        </div>
                                    </div>
                                    <div className="col-5 mb-3 d-flex justify-content-center align-items-center">  
                                        <div className="color-time-picker style-1">    
                                            <TimePickerPicker onChange={setFecha2} value={fecha2} minTime={abre2}/>
                                        </div>
                                    </div>
                                    <div className="col-2 mb-3 d-flex align-items-center justify-content-start">
                                        <i onClick={() => removerCampo(2)} className="fa-solid fa-xmark" style={{ color: '#ff0000', fontSize: '24px' }}></i>
                                    </div>
                                </div>
                            )}

                        </>
                    ) : (
                        <div className="col-12">
                            <p className="mb-1 d-flex align-items-center justify-content-center text-danger">FECHADO</p>
                        </div>
                    )}
                </div>
            </div>             
        </Fragment>
    );
};

export default HorariosGrid;