import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { loadingToggleAction,loginAction,
} from '../../store/actions/AuthActions';

//

import logo from '../../images/logo-full.png'
import bgimage from '../../images/login-img/pic-5.jpg';
import UsernameFild from '../components/componentes/Username';
import SenhaFild from '../components/componentes/Senha';
import swal from 'sweetalert';

function Login (props) {
	const navigate = useNavigate();
    
    let errorsObj = { login: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);

	const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

	

    const dispatch = useDispatch();

    function onLogin(e) {

		alert(login);
		alert(senha);
		swal("Oops", "Email already exists", "error");
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (login === '') {
            errorObj.login = 'Email ou Celular são obrigatórios';
            error = true;
        }
        if (senha === '') {
            errorObj.password = 'Senha é obrigatória';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
			return ;
		}
		
		dispatch(loadingToggleAction(true));

		dispatch(loginAction(login, senha, navigate));
		
		/* dispatch(loginAction(login, password, props.history)).then((result) => {
			if(typeof(result) != 'undefined' && result != null && result.registered == true){
				navigate('/dashboard');
			}
		}); */
		
		//navigate('/dashboard');
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

										<form onSubmit={onLogin}>

						
										<div className="form">
											<UsernameFild changeLogin={setLogin} validar={'login'}>
											</UsernameFild>

											<SenhaFild changeSenha={setSenha} validar={'login'}>
											</SenhaFild>

											<div className="text-center mt-3">
												<button type="submit" className="btn btn-primary btn-block">Fazer Login</button>
											</div>

										</div>
											
											
										
                    

					
                 


											

{/* lembrar informações de login
											<div className="row d-flex justify-content-between mt-4 mb-2">
												<div className="mb-3">
													<div className="form-check custom-checkbox ms-1">
														<input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
														<label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
													</div>
												</div>
												 <div className="mb-3">
													<Link to="/page-register">Sign up</Link>
												</div>
											</div>
*/}
											
											
										</form>

{/*//Login com outras plataformas
										<div className="text-center my-3">
											<span className="dlab-sign-up style-1">Continue With</span>
										</div>
										<div className="mb-3 dlab-signup-icon">
											<button className="btn btn-outline-light me-1"><i className="fa-brands fa-facebook me-2 facebook"></i>Facebook</button>
											<button className="btn btn-outline-light me-1"><i className="fa-brands fa-google me-2 google"></i>Google</button>
											<button className="btn btn-outline-light mt-lg-0 mt-md-1 mt-sm-0 mt-1 linked-btn"><i className="fa-brands fa-linkedin me-2 likedin"></i>linkedin</button>
										</div>

*/}
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