import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TextoGenerico = ({ changeTexto, valor, campo, placeholder, changeErro, desabilitado }) => {
  
  const mudarTexto = (event) => {
    const novoTexto = event.target.value;
    changeTexto(novoTexto);
  };

  const validaGenerico = Yup.object().shape({
    texto: Yup.string()
      .required(`O campo ${campo} é obrigatório`)
      .test(
        "espacoEmBranco",
        `O campo ${campo} é obrigatório`,
        (value) => !(/^\s+$/.test(value))
      ),
  });

  const validacontato = Yup.object().shape({
    texto: Yup.string()
      .matches(/^\d{11}$/, 'Deve ter exatamente 11 números com DDD')
      .required('Número de WhatsApp é obrigatório'),  
  });
  

  return (
    <div className="row">
      <div className="col-lg-12">
        <Formik
          initialValues={{ texto: valor ?? "" }}
          validationSchema={campo=='WhatsApp'? validacontato : validaGenerico}
        >
          {({ values, errors, handleChange, handleBlur }) => (
            <form>
              <div className={`form-group mb-3 ${values.texto ? errors.texto ? "is-invalid" + changeErro(true) : "is-valid" + changeErro(false): ""+ changeErro(true)}`}>
                
                <Field
                  type="text"
                  name="texto"
                  className="form-control input-rounded"
                  disabled={desabilitado}
                  placeholder={placeholder}
                  onChange={(event) => {
                    handleChange(event);
                    mudarTexto(event);
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
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TextoGenerico;
