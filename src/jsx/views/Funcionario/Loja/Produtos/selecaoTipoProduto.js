import React, { Fragment } from "react";
import { Button } from "react-bootstrap";

const SelecaoTipoProduto = ({step, setStep, imagem, tipo, descricao }) => {
	
	return (
		<Fragment>    
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
                  <h4 className="mt-4 mb-1">{tipo}</h4>
                  <p className="text-muted">{descricao}</p>
                  
                  <Button onClick={()=> setStep(step)} className="me-2" variant="outline-primary btn-rounded">
                     Continuar
                  </Button>
               </div>
            </div>
         </div>
		</Fragment>
	);
};

export default SelecaoTipoProduto;