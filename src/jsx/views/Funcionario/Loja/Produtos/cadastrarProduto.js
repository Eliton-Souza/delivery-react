import React, { Fragment, useEffect, useState } from "react";
import imagem from "../../../../../images/pacote.png"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TituloPagina from "../../../../components/componentes/TituloPagina";
import CadastrarProdutoSimples from "./cadastrarProdutoSimples";
import { OpcoesHamburgueriaLanchonetePizzaria, OpcoesRestaurante } from "./helper";
import SelecaoComplemento from "./selecaoComplemento";

const CadastrarProduto = () => {

	const navigate = useNavigate();

	const [loading, setLoading]= useState(false);

   const [tipo, setTipo] = useState(null);
   const [step, setStep]= useState(1);

   useEffect(() => {
      if(step==1){
         setTipo(null);
      }
    }, [step]); 
	
	return (
		<Fragment>
         <TituloPagina titulo={"/Cadastrar Produto"}></TituloPagina>
         <br></br>
         
         {step == 1 && (   
            <div>
               <div className="mb-3 d-flex justify-content-center align-items-center">
                  <h4>Selecione o tipo do seu produto</h4>
               </div>
               <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-12 col-sm-6">
                     <div className="card overflow-hidden">
                        <div className="card-body">
                           <div className="text-center">
                              <div className="profile-photo">
                                 <img
                                    src={imagem}
                                    width="100"
                                    className="img-fluid rounded-circle"
                                    alt=""
                                 />
                              </div>

                              <h5 className="mt-4 mb-1">Tipo de Produto</h5>

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
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {step == 2 && (   
            <CadastrarProdutoSimples tipo={tipo} setStep={setStep}></CadastrarProdutoSimples>
         )}

         {step == 3 && (   
            <SelecaoComplemento setStep={setStep}></SelecaoComplemento>
         )}


         



		</Fragment>
	);
};

export default CadastrarProduto;