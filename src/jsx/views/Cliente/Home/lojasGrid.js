import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { api } from '../../../../services/api';
import LoadingPage from '../../../components/componentes/LoadingPage';
import semLogo from "../../../../images/lojaSemImagemCliente.png";

const LojasGrid = () =>{

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [lojas, setLojas] = useState([]);


  const pegarLojas= async () => {    
	
		setLoading(true);
		const result = await api.pegarLojas();			

		if(result.success){
      			
			setLojas(result.lojas);
					
		}else{
			swal("Oops", result.error, "error");
      navigate('/page-error-404');
		}
    setLoading(false);
	}

  const redirecionarLoja = (nome) => {
    const nomeFormatado = nome.replace(/\s+/g, '-'); // Substitui todos os espaços em branco por hífens
    navigate(`/loja/${nomeFormatado}`);
  }
    
  useEffect(() => {
    pegarLojas();
  }, []); 

  return(
    <>

      {loading && (
        <LoadingPage></LoadingPage>
      )}

      {lojas && (           
        <div className='row'>
          {lojas.map((loja, index) => (

            <div className="col-xl-3 col-xxl-4 col-sm-6" key={index}>
              <div className="card dishe-bx b-hover review style-1" onClick={()=>redirecionarLoja(loja.nome)}>
                <div className="card-body text-center py-3 d-flex justify-content-center">
                    <img src={ loja.logo != '' ? loja.logo : semLogo } alt="" />
                </div>
                <div className="card-footer pt-0 border-0 text-center">
                  <div>
                    <Link to={"#"}><h4 className="mb-0" >{loja.nome}</h4></Link>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="mb-0 pe-2">4.97 km</p>
                      <svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="3" cy="3.5" r="3" fill="#C4C4C4"/>
                      </svg>
                      <p className="mb-0 ps-2">{loja.entrega}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>   

          ))}
        </div>    
      )} 
    </>
  )
}

export default LojasGrid;