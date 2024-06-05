import React, { Fragment, useState } from "react";
import grupo from "../../../../../images/grupo.png"
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { OpcoesHamburgueriaLanchonetePizzaria, OpcoesRestaurante } from "./helper";

//CONTINUAR DEPOIS DE FAZER GRUPOS
const SelecaoComplemento = ({ setStep }) => {

   const [tipo, setTipo] = useState(null);

	return (
		<Fragment>        
           
         <div className="mb-3 d-flex justify-content-center align-items-center">
            <h4>Deseja adicionar um grupo de complementos ao seu produto? (opcional)</h4>
         </div>

         <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-sm-6">
               <div className="card overflow-hidden">
                  <div className="card-body">
                     <div className="text-center">
                        <div className="profile-photo">
                           <img
                              src={grupo}
                              width="100"
                              className="img-fluid rounded-circle"
                              alt=""
                           />
                        </div>

                        <h5 className="mt-4 mb-1">Grupo de Complementos</h5>

                        <div className="form-group mb-3">
                           <select defaultValue="" className="form-control" onChange={(e) => setTipo(e.target.value)}>
                              <option value="" disabled>
                                 Selecione uma opção
                              </option>
                              <OpcoesHamburgueriaLanchonetePizzaria></OpcoesHamburgueriaLanchonetePizzaria>
                           </select>
                        </div>

                        <Button disabled={!tipo} onClick={()=> tipo=='pizza' ? setStep(4) : setStep(2)} className="me-2" variant="outline-primary btn-rounded">
                           Continuar
                        </Button>
                     </div>

                     <div className="text-center mt-5">
                        <NavLink to="/" className="text-primary">Gerenciar Grupos</NavLink>
                     </div>
                  </div>
               </div>
            </div>
         </div>
		</Fragment>
	);
};

export default SelecaoComplemento;