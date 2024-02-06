import React, { Fragment, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const senhaSchema = Yup.object().shape({
  password: Yup.string()
    .required("Por favor, digite sua senha"),
});

const novaSenha = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, 'Deve conter pelo menos uma letra e um número')
    .required('A senha é obrigatória'),
});


const SenhaFild = ({changeSenha, validar, placeholder, senhaAnterior, changeErro}) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const mudarSenha = (event) => {
    const novaSenha = event.target.value;
    changeSenha(novaSenha);
  };

  const confirmarSenha = Yup.object().shape({
    password: Yup.string()
      .oneOf([senhaAnterior, null], 'As senhas não coincidem')
      .required('A senha é obrigatória'),
  });

  useEffect(() => {
		changeSenha("");
  }, [senhaAnterior]);

  return (
    <Fragment>
      <div className="row">          
        <div className="col-lg-12">
          <Formik
            initialValues={{ password: "" }}
            validationSchema={validar=='login'? senhaSchema: validar=='novaSenha'? novaSenha: confirmarSenha}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur                
            }) => (
              <form>                 
                    
                <div className={`form-group mb-3 
                ${values.password ? 
                  errors.password ? "is-invalid" + changeErro(true) : "is-valid" + changeErro(false)
                : ""+ changeErro(true)}`}>

                  <div className="input-group transparent-append mb-2">
                      <span className="input-group-text">                              
                        <i className="fa fa-lock" />
                      </span>
                    
                    <input
                      type={`${mostrarSenha ? "text" : "password"}`}
                      className="form-control"
                      name="password"
                      onChange={(event) => {
                        handleChange(event);    //Atualiza no componente
                        mudarSenha(event);      //Atualiza no componente pai
                      }}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder={placeholder}
                    />

                    <div
                      className="input-group-text "
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                    >                          
                      {mostrarSenha === false ? (<i className="fa fa-eye-slash" />) : (<i className="fa fa-eye" />)}
                      
                    </div>
                    <div
                      id="val-username1-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: "block" }}
                    >
                      {errors.password && errors.password}
                    </div>
                  </div>
                </div>                    

            </form>
            )}
          </Formik>             
        </div>
      </div>
    </Fragment>
  );
};

export default SenhaFild;
