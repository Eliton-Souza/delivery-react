import React, { Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const validaGenero = Yup.object().shape({
  genero: Yup.string().required("Por favor, escolha uma opção"),
});

const GeneroField = ({ changeGenero, changeErro }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <Formik
            initialValues={{ genero: "" }}
            validationSchema={validaGenero}            
          >
            {({ values, errors, handleChange }) => (
              <form>
                <div className={`form-group mb-3 ${values.genero ? errors.genero ? "is-invalid" + changeErro(true) : "is-valid" + changeErro(false): ""+ changeErro(true)}`}>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="genero"
                        value="Masculino"
                        onChange={(e) => {
                          handleChange(e);
                          changeGenero(e.target.value);
                        }}
                      />
                      <label className="form-check-label">Masculino</label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="genero"
                        value="Feminino"
                        onChange={(e) => {
                          handleChange(e);
                          changeGenero(e.target.value);
                        }}
                      />
                      <label className="form-check-label">Feminino</label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="genero"
                        value="NaoInformado"
                        onChange={(e) => {
                          handleChange(e);
                          changeGenero(e.target.value);
                        }}
                      />
                      <label className="form-check-label">Não desejo informar</label>
                    </div>

                    <div
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: "block" }}
                    >
                      {errors.genero && errors.genero}
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

export default GeneroField;