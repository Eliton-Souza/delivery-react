import React, { Fragment, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useUsuario } from "../../../../../context/UsuarioContext";

const ExibirProdutosGrupo = ({ id_grupo }) => {

    const { usuario } = useUsuario();

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [taxas, setTaxas] = useState([]);
    const [erro, setErro] = useState([]);
    
      
    return (
        <Fragment>
         
               
                 testando
          
        </Fragment>
    );
    
};

export default ExibirProdutosGrupo;