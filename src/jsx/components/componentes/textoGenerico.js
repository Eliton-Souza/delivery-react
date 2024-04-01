import React, { Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";


const TextoGenerico = ({ changeTexto, campo, placeholder, changeErro, desabilitado }) => {

  const mudarTexto = (event) => {
    const novoTexto = event.target.value;
    changeTexto(novoTexto);
  };

  const validaGenerico = Yup.object().shape({
    texto: Yup.string()
      .required(`O campo ${campo} é obrigatório`),
  });
 
  return (
    <Fragment>  
      <div className="row">          
        <div className="col-lg-12">
          <Formik
            initialValues={{ texto: "" }}
            validationSchema={ validaGenerico }
          >
            {({
              values,
              errors,
              handleBlur,
              handleChange           
            }) => (
              <form >
                <div className={`form-group mb-3 ${values.texto ? errors.texto ? "is-invalid" + changeErro(true) : "is-valid" + changeErro(false): ""+ changeErro(true)}`}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control input-rounded"    
                      disabled={desabilitado}                 
                      placeholder={placeholder}
                      name="texto"
                      onChange={(event) => {
                        handleChange(event);    //Atualiza no componente
                        mudarTexto(event);      //Atualiza no componente pai                       
                      }}
                      onBlur={handleBlur}
                      value={values.texto}
                    />
                    <div                      
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: "block" }}
                    >
                      {errors.texto && errors.texto}
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

export default TextoGenerico;
