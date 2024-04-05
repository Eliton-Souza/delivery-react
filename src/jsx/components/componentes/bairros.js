import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { api } from "../../../services/api";

const BairroFild = ({ changeIdBairro, bairros, setBairros, changeErro, desabilitado }) => {
  
  const [loading, setLoading] = useState(false);

  const mudarBairro = (event) => {
    const novoBairro = event.target.value;
    changeIdBairro(novoBairro);
  };

  const validaBairro = Yup.object().shape({
    bairro: Yup.string()
      .required(`O campo Bairro é obrigatório`),
  });

  const pegarBairros= async () => {     
      
    setLoading(true);
    const result = await api.pegarBairros("Boca Do Acre");			

    if(result.success){      			
      setBairros(result.bairros);
    }else{
      swal("Oops", result.error, "error");
      navigate('/home');
    }
    setLoading(false);
  }

  useEffect(() => {
    pegarBairros();
  }, []); 
 
  return (
    <div className="row">          
      <div className="col-lg-12">
        <Formik
          initialValues={{ bairro: "" }}
          validationSchema={ validaBairro }
        >
          {({
            values,
            errors,
            handleBlur,
            handleChange           
          }) => (
            <form >
              <div className={`form-group mb-3 ${values.bairro ? errors.bairro ? "is-invalid" + changeErro(true) : "is-valid" + changeErro(false): ""+ changeErro(true)}`}>
                <div className="form-group">

                  <select
                    name="bairro"
                    id="inputState"
                    className="form-control input-rounded"
                    onChange={(event) => {
                      handleChange(event);    // Atualiza no componente
                      mudarBairro(event);     // Atualiza no componente pai                       
                    }}
                    onBlur={handleBlur}
                    value={values.bairro}
                    disabled={desabilitado}
                  >
                    <option value="" disabled hidden>
                      {loading ? "Carregando..." : "Escolha o Bairro"}
                    </option>

                    {bairros && bairros.map((bairro, index) => (
                      <option key={index} value={bairro.id_bairro}>{bairro.nome}</option>
                    ))}
  
                  </select>

                  <div                      
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: "block" }}
                  >
                    {errors.bairro && errors.bairro}
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

export default BairroFild;