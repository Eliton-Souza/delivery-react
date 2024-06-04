import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { api } from "../../../services/api";

const CategoriaField = ({ changeIdCategoria, changeErro, desabilitado }) => {
  
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const validaCategoria = Yup.object().shape({
    categoria: Yup.string()
      .required(`O campo Categoria é obrigatório`),
  });

  const pegarCategorias= async () => {     
      
    setLoading(true);
    const result = await api.pegarCategorias();			

    if(result.success){      			
      setCategorias(result.categorias);
    }else{
      swal("Oops", result.error, "error");
      navigate('/home');
    }
    setLoading(false);
  }

  useEffect(() => {
    pegarCategorias();
  }, []); 
 
  return (
    <div className="row">          
      <div className="col-lg-12">
        <Formik
          initialValues={{ categoria: "" }}
          validationSchema={ validaCategoria }
        >
          {({
            values,
            errors,
            handleBlur,
            handleChange           
          }) => (
            <form >
              <div className={`form-group mb-3 ${values.categoria ? errors.categoria ? "is-invalid" + changeErro(true) : "is-valid" + changeErro(false): ""+ changeErro(true)}`}>
                <div className="form-group">

                  <select
                    name="categoria"
                    id="inputState"
                    className="form-control input-rounded"
                    onChange={(event) => {
                      handleChange(event);                      // Atualiza no componente
                      changeIdCategoria(event.target.value);    // Atualiza no componente pai                 
                    }}
                    onBlur={handleBlur}
                    value={values.categoria}
                    disabled={desabilitado}
                  >
                    <option value="" disabled hidden>
                      {loading ? "Carregando..." : "Escolha a categoria"}
                    </option>

                    {categorias && categorias.map((categoria, index) => (
                      <option key={index} value={categoria.id_categoria}>{categoria.nome}</option>
                    ))}
  
                  </select>

                  <div                      
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: "block" }}
                  >
                    {errors.categoria && errors.categoria}
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

export default CategoriaField;