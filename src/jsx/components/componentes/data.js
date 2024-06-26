import React, { Fragment, useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";


const validaData = Yup.object().shape({
  data: Yup.date()
    .required("Por favor, escolha uma data")
    .max(new Date(), "Data inválida"),
});


const DataField = ({ changeData, changeErro }) => {

  const mudarData = (event) => {
    const novaData = event.target.value;
    changeData(novaData);
  };
 
  return (
    <Fragment>  
      <div className="row">          
        <div className="col-lg-12">
          <Formik
            initialValues={{ data: "" }}
            validationSchema={validaData}
          >
            {({
              values,
              errors,
              handleBlur,
              handleChange                         
            }) => (
              <form >
                <div className={`form-group mb-3 ${values.data ? errors.data ? "is-invalid" + changeErro(true) : "is-valid" + changeErro(false): ""+ changeErro(true)}`}>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control input-rounded"
                      name="data"
                      onChange={(event) => { 
                        handleChange(event);              //Atualiza no componente
                        mudarData(event, errors.data);     //Atualiza no componente pai                  
                      }}
                      onBlur={handleBlur}
                      value={values.data}
                    />
                    <div                      
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: "block" }}
                    >
                      {errors.data && errors.data}
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

export default DataField;
