import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Badge } from "react-bootstrap";
import * as Yup from "yup";

const Taxa = ({ setTaxa, valor, bairro, placeholder, changeErro, desabilitado }) => {
  
  const [erro, setErro] = useState(false);
  const [badgeValor, setBadgeValor] = useState(valor);

  const validaTaxa = Yup.object().shape({
    texto: Yup.string()
      .matches(/^\d+(\,\d+)?$/, 'Deve ser um valor numérico positivo ou vazio')
      .nullable(true)
  });  
    
  return (
    <div className="row">
      <div className="col-12">
        <Formik
          initialValues={{ texto: valor ?? "" }}
          validationSchema={validaTaxa}
        >
          {({ values, errors, handleChange, handleBlur }) => {

            useEffect(() => {
              if (errors.texto) {
                changeErro(bairro, true);
                setErro(true);
              } else {
                changeErro(bairro, false);
                setErro(false);
              }
            }, [errors.texto]);

            return (
              <form>
                <div className={`form-group mb-3 ${values.texto ? errors.texto ? "is-invalid"  : "is-valid" : ""}`}>
                  <div className={`input-group mb-3 input-${erro ? 'danger' : 'warning'}`}>
                    <span className="input-group-text d-flex justify-content-center align-items-center" style={{ width: '110px' }}>
                      {bairro}
                    </span>
                    
                    <Field
                      type="text"
                      name="texto"
                      className="form-control input-rounded"
                      disabled={desabilitado}
                      placeholder={placeholder}
                      onChange={(event) => {
                        handleChange(event);
                        setTaxa(bairro, event.target.value);
                        setBadgeValor(event.target.value);
                      }}
                      onBlur={handleBlur}                      
                    />

                    {badgeValor && !erro && parseFloat(badgeValor.replace(",", ".")) == 0 && (
                      <Badge bg="success badge-rounded badge-lg d-flex align-items-center">
                        Grátis
                      </Badge>
                    )}

                    {!badgeValor && (
                      <Badge bg="danger badge-rounded badge-lg d-flex align-items-center">
                        Não entrega
                      </Badge>
                    )}
                    
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

export default Taxa;