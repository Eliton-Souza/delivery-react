import React, { Fragment, useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";


const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Por favor, digite seu identificador de usuário"),
});

const cadastroSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Your username must consist of at least 3 characters ")
    .max(50, "Your username must consist of at least 3 characters ")
    .required("Por favor, digite seu identificador de usuário"),
});

const UsernameFild = ({changeLogin, validar}) => {

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
            validationSchema={validar=='login'? loginSchema: cadastroSchema}
          >
            {({
              values,
              errors,
              handleBlur,
              handleChange           
            }) => (
              <form >
                <div className={`form-group mb-3 ${values.username ? errors.username ? "is-invalid" : "is-valid" : ""}`}>
                  <label className="text-label"><strong>Email ou Celular *</strong></label>
                  <div className="input-group">

                      <span className="input-group-text">
                        <i className="fa fa-user" />{" "}
                      </span>
                      
                    <input
                      type="text"
                      className="form-control"
                      id="val-username1"
                      placeholder="Digite seu identificador"
                      name="username"
                      onChange={(event) => {
                        handleChange(event);    //Atualiza no componente
                        mudarLogin(event);      //Atualiza no componente pai
                      }}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    <div
                      id="val-username1-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: "block" }}
                    >
                      {errors.username && errors.username}
                    </div>

                    <div
                      id="val-username1-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: "block" }}
                    />

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
