import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const TipoGrupoField = ({ changeTipo, changeErro, desabilitado }) => {
  
  const validaTipo = Yup.object().shape({
    tipo: Yup.string()
      .required(`Tipo do grupo é obrigatório`),
  });

 
  return (
    <div className="row">          
      <div className="col-lg-12">
        <Formik
          initialValues={{ tipo: "" }}
          validationSchema={ validaTipo }
        >
          {({
            values,
            errors,
            handleBlur,
            handleChange           
          }) => (
            <form >
              <div className={`form-group mb-3 ${values.tipo ? errors.tipo ? "is-invalid" + changeErro(true) : "is-valid" + changeErro(false): ""+ changeErro(true)}`}>
                <div className="form-group">

                  <select
                    name="tipo"
                    id="inputState"
                    className="form-control input-rounded"
                    onChange={(event) => {
                      handleChange(event);                      // Atualiza no componente
                      changeTipo(event.target.value);           // Atualiza no componente pai                 
                    }}
                    onBlur={handleBlur}
                    value={values.tipo}
                    disabled={desabilitado}
                  >
                    <option value="" disabled hidden>
                      Escolha o tipo
                    </option>
                    <option key={1} value="comp">Complemento</option>
                    <option key={2} value="sabor">Sabores de Pizza</option>
                  </select>

                  <div                      
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: "block" }}
                  >
                    {errors.tipo && errors.tipo}
                  </div>

                </div>
              </div>                
            </form>
          )}
        </Formik>              
      </div>      
    </div>
  );
};

export default TipoGrupoField;