import React, { Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const validaGenero = Yup.object().shape({
  genero: Yup.string().required("Por favor, escolha uma opção"),
});

const GeneroField = ({ changeGenero }) => {
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
                <div className={`form-group mb-3 ${values.genero ? errors.genero ? "is-invalid" : "is-valid" : ""}`}>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="genero"
                        value="Masculino"
                        checked={values.genero === "Masculino"}
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
                        checked={values.genero === "Feminino"}
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
                        checked={values.genero === "NaoInformado"}
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
