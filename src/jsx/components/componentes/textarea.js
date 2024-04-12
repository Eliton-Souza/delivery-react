import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TextAreaGenericField = ({ changeTextArea, valor, campo, placeholder, changeErro, desabilitado }) => {
  
  const mudarTexto = (event) => {
    const novoTexto = event.target.value;
    changeTextArea(novoTexto);
  };

  const validaGenerico = Yup.object().shape({
    textArea: Yup.string()
    .required(`O campo ${campo} é obrigatório`)
    .test(
      "espacoEmBranco",
      `O campo ${campo} é obrigatório`,
      (value) => !(/^\s+$/.test(value))
    ),
  });

  return (
    <Formik
      initialValues={{ textArea: valor ?? "" }}
      validationSchema={validaGenerico}
      onSubmit={() => {}}
    >
      {({ values, errors, handleChange, handleBlur }) => (
        <form>
          <div className="row">
            <div className="col-lg-12">
              <div className={`form-group mb-3 ${values.textArea ? errors.textArea ? "is-invalid" + changeErro(true) : "is-valid" + changeErro(false): ""+ changeErro(true)}`}>
 
                <Field
                  as="textarea"
                  name="textArea"
                  cols={30}
                  rows={5}
                  className="form-control bg-transparent"
                  disabled={desabilitado}
                  placeholder={placeholder}
                  onChange={(event) => {
                    handleChange(event);
                    mudarTexto(event);
                  }}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  name="textArea"
                  component="div"
                  className="invalid-feedback animated fadeInUp"
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default TextAreaGenericField;