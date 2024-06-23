import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Preco = ({setPreco, valor, placeholder, changeErro, desabilitado }) => {
  
  const [erro, setErro] = useState(false);

  const validaPreco = Yup.object().shape({
    texto: Yup.string()
      .matches(/^\d+(\,\d+)?$/, 'Deve ser 0 ou um valor numérico positivo separado por vírgula')
      .required('O campo Preço é obrigatório')
  });  
    
  return (
    <div className="row">
      <div className="col-12">
        <Formik
          initialValues={{ texto: valor ?? "" }}
          validationSchema={validaPreco}
        >
          {({ values, errors, handleChange, handleBlur }) => {

            useEffect(() => {
              if (errors.texto) {
                changeErro(true);
                setErro(true);
              } else {
                changeErro(false);
                setErro(false);
              }
            }, [errors.texto]);

            return (
              <form>
                <div className={`form-group mb-3 ${values.texto ? errors.texto ? "is-invalid"  : "is-valid" : ""}`}>
                  <div className={`input-group mb-3 input-${erro ? 'danger' : 'warning'}`}>
                                
                    <Field
                      type="text"
                      name="texto"
                      className="form-control input-rounded"
                      disabled={desabilitado}
                      placeholder={placeholder}
                      onChange={(event) => {
                        handleChange(event);
                        setPreco(event.target.value);
                      }}
                      onBlur={handleBlur}                      
                    />
                   
                    <ErrorMessage
                      name="texto"
                      component="div"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: "block" }}
                    />
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Preco;