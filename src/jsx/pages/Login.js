import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import logo from '../../images/logo-full.png'
import bgimage from '../../images/login-img/pic-5.jpg';
import UsernameFild from '../components/componentes/Username';
import SenhaFild from '../components/componentes/Senha';
import swal from 'sweetalert';
import { api, saveToken } from '../../services/api';

function Login () {

	const navigate = useNavigate();
    
	const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

	const [loading, setLoading]= useState(false);
	const [erro, setErro] = useState(true);
	

    const onLogin= async () => {     

        if (login !== '' && senha !== '') {
			setLoading(true);
			const result = await api.fazerLogin(login, senha);			
			setLoading(false);

			if(result.success){
				saveToken(result.token);       
				navigate('/dashboard');
			}else{
				swal("Oops", result.error, "error");
			}
        }
        else {
			swal("Oops", "Preencha todos os campos", "error");
        }
    }

  return (
            
		<div className="container mt-0">
			<div className="row  align-items-center justify-contain-center bg-login">
				<div className="col-xl-12 mt-5">
					<div className="card border-0">
						<div className="card-body login-bx">
							<div className="row mt-5">

								<div className="col-xl-8 col-md-6  text-center">
									<img src={bgimage} className="food-img" alt="" />
								</div>

								<div className="col-xl-4 col-md-6 pe-0">
									<div className="sign-in-your">
										<div className="text-center mb-3">
											<img src={logo} className="mb-3" alt="" />
											<h4 className="fs-20 font-w800 text-black">Faça login</h4>											
										</div>

										<form >					
											<div className="form">

												<label className="text-label">
													<strong>Email ou Celular
													<span className="text-danger"> *</span>
													</strong>
												</label>											
												<UsernameFild
													login={login} changeLogin={setLogin} validar={'login'} changeErro={setErro} placeholder={"Digite seu identificador"}>
												</UsernameFild>

												<label className="text-label">
													<strong>Senha
													<span className="text-danger"> *</span>
													</strong>
												</label>
												<SenhaFild
													senha={senha} changeSenha={setSenha} validar={'login'} changeErro={setErro} placeholder={"Digite sua senha"}>
												</SenhaFild>

												<div className="text-center mt-3">
													<button type="button" onClick={onLogin} disabled={loading || erro} className="btn btn-primary btn-block">{loading ? "Carregando..." : "Fazer Login"}</button>
												</div>

											</div>											
										</form>

										<div className="text-center mt-5">
											<span>Não tem uma conta?<NavLink to="/page-register" className="text-primary"> Jute-se a nós</NavLink></span>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}


export default Login;