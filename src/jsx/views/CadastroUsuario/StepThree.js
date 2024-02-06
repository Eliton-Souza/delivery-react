import React, { useEffect, useState } from "react";
import NomeField from "../../components/componentes/nome";
import GeneroField from "../../components/componentes/genero";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import DataField from "../../components/componentes/data";
import FotoField from "../../components/componentes/foto";

const StepThree = ({ onChange, onChangeErro, usuario, setFile }) => {

   const [nome, setNome] = useState(usuario.nome);
   const [sobrenome, setSobrenome] = useState(usuario.sobrenome);
   const [nascimento, setNascimento] = useState(usuario.nascimento);
   const [genero, setGenero] = useState(usuario.genero);

   const [nomeErro, setNomeErro] = useState(true);
   const [sobrenomeErro, setSobrenomeErro] = useState(true);
   const [nascimentoErro, setNascimentoErro] = useState(true);
   const [generoErro, setGeneroErro] = useState(true);

   useEffect(() => {
      onChange(nome, sobrenome, genero, nascimento);
   }, [nome, sobrenome, genero, nascimento]); 

   useEffect(() => {
      if(nomeErro || sobrenomeErro || generoErro || nascimentoErro){
         onChangeErro(true);
      }else{
         onChangeErro(false);
      }
   }, [nomeErro, sobrenomeErro, generoErro, nascimentoErro]);


   return (
      <section>
         <div className="row">
            <div className="col-xl-12">
              
                  <div className="card-header">
                     <h4 className="card-title">Dados Pessoais</h4>
                  </div>

                  <div className="card-body">
                     <div className="basic-form">

                        <form >
                           <div className="row">
                              <div className="form-group mb-3 col-md-6">                     
                                 <label className="text-label">
                                    <strong>Nome
                                       <span className="text-danger"> *</span>
                                    </strong>
                                 </label>
                                 
                                 <NomeField
                                    changeNome={setNome} validar={"nome"} placeholder={"Primeiro Nome"} changeErro={setNomeErro}>                                 
                                 </NomeField>
                              </div>

                              <div className="form-group mb-3 col-md-6">                     
                                 <label className="text-label">
                                    <strong>Sobrenome
                                       <span className="text-danger"> *</span>
                                    </strong>
                                 </label>
                                 
                                 <NomeField
                                    changeNome={setSobrenome} validar={"sobrenome"} placeholder={"Segundo Nome"} changeErro={setSobrenomeErro}>                                 
                                 </NomeField>
                              </div>                              
                           </div>

                           <div className="row">
                              <div className="form-group mb-3 col-md-6">
                                 <label className="text-label">
                                    <strong>Nascimento
                                       <span className="text-danger"> *</span>
                                    </strong>
                                 </label>

                                 <DataField 
                                    changeData={setNascimento} changeErro={setNascimentoErro}>
                                 </DataField>
                              </div>

                              <div className="form-group mb-3 col-md-6">
                                 <label className="text-label">
                                    <strong>Gênero
                                       <span className="text-danger"> *</span>
                                    </strong>
                                 </label>

                                 <GeneroField 
                                    changeGenero={setGenero} changeErro={setGeneroErro}>
                                 </GeneroField>                              
                              </div>
                           </div>


                           <div className="row">
                              <div className="form-group mb-3 col-md-6">
                                 <label className="text-label">
                                    <strong>Foto de Perfil</strong>
                                 </label>

                                 <FotoField 
                                   changeFoto={setFile} >
                                 </FotoField>                              
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            
         </div>
      </section>
   );
};

export default StepThree;
