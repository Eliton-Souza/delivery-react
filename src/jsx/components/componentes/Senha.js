import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const senhaSchema = Yup.object().shape({
  password: Yup.string()
    .required("Por favor, digite sua senha"),
});

const cadastarSenhaSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Your password must be at least 5 characters long")
    .max(50, "Your password must be at least 5 characters long")
    .required("Por favor, digite sua senha"),
});

const SenhaFild = ({changeSenha, validar}) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const mudarSenha = (event) => {
    const novaSenha = event.target.value;
    changeSenha(novaSenha);
  };

  return (
    <Fragment>
     

      <div className="row">          
        <div className="col-lg-12">
          <Formik
            initialValues={{ password: "" }}
            validationSchema={validar=='login'? senhaSchema: cadastarSenhaSchema}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur                
            }) => (
              <form>                     
                <div
                  className={`form-group mb-3 ${ values.password ? errors.password ? "is-invalid" : "is-valid" : "" }`}>
                  <label className="text-label"><strong>Senha *</strong></label>
                  <div className="input-group transparent-append mb-2">
                    
                      <span className="input-group-text">                              
                        <i className="fa fa-lock" />
                      </span>
                    
                    <input
                      type={`${mostrarSenha ? "text" : "password"}`}
                      className="form-control"
                      id="val-password1"
                      name="password"
                      onChange={(event) => {
                        handleChange(event);    //Atualiza no componente
                        mudarSenha(event);      //Atualiza no componente pai
                      }}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Digite sua senha"
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
