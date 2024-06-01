import React, { Fragment, useState } from "react";
import imagem from "../../../../../images/no-img-avatar.png"
import { Button, Card, CardBody, CardHeader } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TituloPagina from "../../../../components/componentes/TituloPagina";
import SelecaoTipoProduto from "./selecaoTipoProduto";



const CadastrarProduto = () => {

	const navigate = useNavigate();

	const [loading, setLoading]= useState(false);

   const [step, setStep]= useState(1);

	
	return (
		<Fragment>
         <TituloPagina titulo={"/Cadastrar Produto"}></TituloPagina>
         <br></br>

         {step == 1 && (   
            <div>
               <div className="mb-3 d-flex justify-content-center align-items-center">
                  <h6>Seu produto foi preparado por você ou pela indústria?</h6>
               </div>
               <div className="row">
                  <div className="col-6">
                     <SelecaoTipoProduto step={2} setStep={setStep} imagem={imagem} tipo={"Preparado"} descricao={"Pizzas, hamburguers, bolos..."}></SelecaoTipoProduto>
                  </div>
                  <div className="col-6">
                     <SelecaoTipoProduto step={4} setStep={setStep} imagem={imagem} tipo={"Industrializado"} descricao={"refrigerantes, chocolates, sorvetes..."}></SelecaoTipoProduto>
                  </div>
               </div>
            </div>
         )}
         
         {step == 2 && (   
            <div>
               <div className="mb-3 d-flex justify-content-center align-items-center">
                  <h6>Seu produto é uma Pizza ou de outro tipo?</h6>
               </div>
               <div className="row">
                  <div className="col-6">
                     <SelecaoTipoProduto step={3} setStep={setStep} imagem={imagem} tipo={"Pizza"} descricao={"Pizza Média, Pizza Família..."}></SelecaoTipoProduto>
                  </div>
                  <div className="col-6">
                     <SelecaoTipoProduto step={4} setStep={setStep} imagem={imagem} tipo={"Outro"} descricao={"hamburguers, bolos, sobremesas..."}></SelecaoTipoProduto>
                  </div>
               </div>
            </div>
         )}
		</Fragment>
	);
};

export default CadastrarProduto;