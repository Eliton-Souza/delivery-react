import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import UsernameFild from "../../components/componentes/Username";
import SenhaFild from "../../components/componentes/Senha";

const StepFour = ({ celular, onChange, onChangeErro }) => {
  
   
   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");
   const [confirmarSenha, setConfirmarSenha] = useState("");

   const [emailErro, setEmailErro] = useState("");
   const [senhaErro, setSenhaErro] = useState("");
   const [confirmarSenhaErro, setConfirmarSenhaErro] = useState("");

   useEffect(() => {
         onChange(email, senha);
   }, [email, senha]);

   useEffect(() => {
      if(emailErro || senhaErro || confirmarSenhaErro){
         onChangeErro(true);
      }else{
         onChangeErro(false);
      }
   }, [emailErro, senhaErro, confirmarSenhaErro]);


   return (
      <section>
         <div className="row">
            <div className="col-xl-12">
              
                  <div className="card-header">
                     <h4 className="card-title">Dados de Login</h4>
                  </div>

                  <div className="card-body">
                     <div className="basic-form">

                        <form >
                           <div className="row">
                              <div className="form-group mb-3 col-md-6">                     
                                 <label className="text-label">
                                    <strong>Celular
                                       <span className="text-danger"> *</span>
                                    </strong>
                                 </label>
                                 
                                 <UsernameFild
                                    login={celular} desabilitado={true} changeErro={null}>                                 
                                 </UsernameFild>
                              </div>

                              <div className="form-group mb-3 col-md-6">                     
                                 <label className="text-label">
                                    <strong>Email</strong>
                                 </label>

                                 <UsernameFild
                                    login={email} changeLogin={setEmail} validar={"email"} placeholder={"exemplo@email.com"} changeErro={setEmailErro} desabilitado={false}>                                 
                                 </UsernameFild>
                              </div>                              
                           </div>

                           <div className="row">
                              <div className="form-group mb-3 col-md-6">                     
                                 <label className="text-label">
                                    <strong>Senha
                                       <span className="text-danger"> *</span>
                                    </strong>
                                 </label>
                                 
                                 <SenhaFild
                                    changeSenha={setSenha} validar={"novaSenha"} changeErro={setSenhaErro} placeholder={"Digite sua senha"}>                                
                                 </SenhaFild>
                              </div>

                              <div className="form-group mb-3 col-md-6">                     
                                 <label className="text-label">
                                    <strong>Confirmar Senha
                                       <span className="text-danger"> *</span>
                                    </strong>
                                 </label>

                                 <SenhaFild
                                    senhaAnterior={senha} changeSenha={setConfirmarSenha} validar={"confirmarSenha"} changeErro={setConfirmarSenhaErro} placeholder={"Confirme sua senha"}>                                
                                 </SenhaFild>
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

export default StepFour;
