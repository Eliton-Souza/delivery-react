import React, { Fragment, useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";


const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Por favor, digite seu identificador de usuário"),
});


const validaEmail = Yup.object().shape({
  username: Yup.string()
    .email('Digite um endereço de e-mail válido')
   
});

const UsernameFild = ({ changeLogin, validar, login, desabilitado, placeholder, changeErro }) => {

  const mudarLogin = (event) => {
    const novoLogin = event.target.value;
    changeLogin(novoLogin);
  };
 
  return (
    <Fragment>  
      <div className="row">          
        <div className="col-lg-12">
          <Formik
            initialValues={{ username: "" }}
            validationSchema={validar === 'login' ? loginSchema :  validaEmail}
          >
            {({
              values,
              errors,
              handleBlur,
              handleChange           
            }) => (
              <form >

                <div className={`form-group mb-3 
                ${values.username ? 
                  errors.username ? "is-invalid" + desabilitado??changeErro(true) : "is-valid" + desabilitado??changeErro(false)
                : ""+ desabilitado??changeErro(true)}`}>

                  <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa fa-user" />{" "}
                      </span>
                      
                    <input
                      type="text"
                      className="form-control"
                      placeholder={placeholder}
                      name="username"
                      disabled={desabilitado}
                      onChange={(event) => {
                        handleChange(event);    //Atualiza no componente
                        mudarLogin(event);      //Atualiza no componente pai
                      }}
                      onBlur={handleBlur}
                      value={login}
                    />
                    <div
                      id="val-username1-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: "block" }}
                    >
                      {errors.username && errors.username}
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

export default UsernameFild;
