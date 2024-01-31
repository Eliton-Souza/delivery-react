import React, { Fragment, useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";


const validaNome = Yup.object().shape({
  nome: Yup.string()
    .required("Por favor, digite seu primeiro nome"),
});

const validaSobrenome = Yup.object().shape({
    nome: Yup.string()
      .required("Por favor, digite seu segundo nome"),
  });

const NomeField = ({ changeNome, validar, placeholder }) => {

  const mudarNome = (event) => {
    const novoNome = event.target.value;
    changeNome(novoNome);
  };
 
  return (
    <Fragment>  
      <div className="row">          
        <div className="col-lg-12">
          <Formik
            initialValues={{ nome: "" }}
            validationSchema={validar=='nome'? validaNome: validaSobrenome}
          >
            {({
              values,
              errors,
              handleBlur,
              handleChange           
            }) => (
              <form >
                <div className={`form-group mb-3 ${values.nome ? errors.nome ? "is-invalid" : "is-valid" : ""}`}>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control input-rounded"                     
                      placeholder={placeholder}
                      name="nome"
                      onChange={(event) => {
                        handleChange(event);    //Atualiza no componente
                        mudarNome(event);      //Atualiza no componente pai
                      }}
                      onBlur={handleBlur}
                      value={values.nome}
                    />
                    <div                      
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: "block" }}
                    >
                      {errors.nome && errors.nome}
                    </div>

                    <div                     
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

export default NomeField;
