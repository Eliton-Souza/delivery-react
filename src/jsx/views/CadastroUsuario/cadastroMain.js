import React, { Fragment, useEffect, useState } from "react";
//import Multistep from "react-multistep";
import { Stepper, Step } from 'react-form-stepper';

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { Button } from "react-bootstrap";
import { api, saveToken } from "../../../services/api";
import { formataCelular } from "./helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const CadastroUsuario = () => {

	const navigate = useNavigate();

	const [goSteps, setGoSteps] = useState(0);
	const [loading, setLoading]= useState(false);

	const [erro, setErro]= useState(true);
	const [erroLogin, setErroLogin]= useState(true);

	const [celular, setCelular] = useState("");
	const [codigo, setCodigo] = useState("");

	const [usuario, setUsuario] = useState({ nome: "", sobrenome: "", genero: "", nascimento: "" });
	const [dadosLogin, setDadosLogin] = useState({ email: "", senha: ""})
	const [foto, setFoto] = useState(null);


	const notificacao = (mensagem) => {
		toast.success("✔️ " + mensagem, {
		  position: "top-right",
		  autoClose: 5000,
		  hideProgressBar: false,
		  closeOnClick: false,
		  pauseOnHover: true,
		  draggable: true,
		});
	};

	const enviarMensagem= async () => {    
	
        if (celular !== "") {
			const celularFormatado= formataCelular(celular);
			setCelular(celularFormatado);

			if(celularFormatado.length === 11){
						
				setLoading(true);
				const result = await api.validaNumero(celularFormatado);			
				setLoading(false);

				if(result.success){
					notificacao("Verifique seu WhatsApp !");
					setGoSteps(1);	
				}else{
					swal("Oops", result.error, "error");
				}
			}else{
				swal("Oops", "O formato do número está inválido", "error");
			}
        }
        else {
			swal("Oops", "Informe seu WhatsApp", "error");
        }
    }


	const validarCodigo= async () => {    
	
        if (codigo !== "") {					
			
			setLoading(true);
			const result = await api.validaCodigo(celular, codigo);			
			setLoading(false);

			if(result.success){
				notificacao(result.message);
				setGoSteps(2);	
			}else{
				swal("Oops", result.error, "error");
			}
        }
        else {
			swal("Oops", "Informe um código", "error");
        }
    }

	const cadastrarUsuario= async () => {    

		let result= null;
	
		setLoading(true);
		if(foto){
			const avatar= await api.uploadFoto(foto);

			if(avatar.success){
				result = await api.cadastrarUsuario(usuario.nome, usuario.sobrenome, usuario.genero, usuario.nascimento, dadosLogin.email, celular, dadosLogin.senha, "cliente", null, avatar.imageUrl);			
			}else{
				result = await api.cadastrarUsuario(usuario.nome, usuario.sobrenome, usuario.genero, usuario.nascimento, dadosLogin.email, celular, dadosLogin.senha, "cliente", null, null);			
			}
		}else{
			result = await api.cadastrarUsuario(usuario.nome, usuario.sobrenome, usuario.genero, usuario.nascimento, dadosLogin.email, celular, dadosLogin.senha, "cliente", null, null);			
		}
		setLoading(false);

		if(result.success){
			swal("Wooow", "Agora você é um de nós!!", "success");
			saveToken(result.token);
			setTimeout(() => {
				navigate('/dashboard');
			}, 500);
				
		}else{
			swal("Oops", result.error, "error");
		}
       
    }

	const changeUsuario = (nome, sobrenome, genero, nascimento) => {
		setUsuario({ nome, sobrenome, genero, nascimento});
		
	};

	const changeDadosLogin = (email, senha) => {
		setDadosLogin({ email, senha});
	};

	  
	
	return (
		<Fragment>
			
			<div className="row">
				<div className="col-xl-12 col-xxl-12">
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">Cadastrar Usuário</h4>
						</div>
						<div className="card-body">
						
							<div className="form-wizard ">
								<Stepper className="nav-wizard" activeStep={goSteps} label={false}>
									<Step className="nav-link" onClick={() => setGoSteps(0)} />
									<Step className="nav-link" onClick={() => setGoSteps(1)} />
									<Step className="nav-link" onClick={() => setGoSteps(2)} />
									<Step className="nav-link" onClick={() => setGoSteps(3)} />
								</Stepper>
								{/* Digitar Celular para validação */}
							  	{goSteps === 0 && (
									<>
										<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
											
											<StepOne
												onChange={setCelular}>												
											</StepOne>

											<div className="text-center toolbar toolbar-bottom p-2">
												<Button className="btn btn-primary sw-btn-next" disabled={loading} variant="warning" onClick={enviarMensagem}>
													
													{loading? "Enviando..." : "Enviar Código"}

													<span className="btn-icon-end">
														<i className="fa fa-envelope" />
													</span>
												</Button>
											</div>

										</div>
									</>							  
							  	)}
								{/* Digitar codigo de validação */}
								{goSteps === 1 && (
									<>
										<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
											
											<StepTwo
												onChange={setCodigo}>
											</StepTwo>

											<div className="text-center toolbar toolbar-bottom p-2">
												<Button className="btn btn-primary sw-btn-next" disabled={loading} variant="warning" onClick={validarCodigo}>
													
													{loading? "Verificando.." : "Verificar Código"}

													<span className="btn-icon-end">
													<i className="fa fa-upload color-success" />
													</span>
												</Button>
											</div>

										</div>
									</>							  
							  	)}
								{/* Inserir dados pessoais */}
								{goSteps === 2 && (
									<>
										<StepThree 
											usuario={usuario} onChange={changeUsuario} onChangeErro={setErro} setFile={setFoto}>
										</StepThree> 
										<div className="text-end toolbar toolbar-bottom p-2">											
											<button className="btn btn-primary sw-btn-next ms-1" disabled={erro} onClick={() => setGoSteps(3)}>Próximo</button>
										</div>	
									</>
								)}
								{/* Inserir dados de login */}
								{goSteps === 3 && (
									<>
										<StepFour onChange={changeDadosLogin} celular={celular} onChangeErro={setErroLogin}/>
										<div className="text-end toolbar toolbar-bottom p-2">
											<button  className="btn btn-secondary sw-btn-prev me-1"
												onClick={() => setGoSteps(2)}
												>Voltar
											</button>
											<button className="btn btn-primary sw-btn-next ms-1" disabled={erroLogin} onClick={cadastrarUsuario}>Cadastrar</button>
										</div>	
									</>	
								)}
							  
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default CadastroUsuario;
