import { lazy, Suspense } from 'react';

/// Components
import Index from "./jsx";
import {  Route, Routes } from 'react-router-dom';


/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import { ToastContainer } from 'react-toastify';
import { CarrinhoProvider } from './context/CarrinhoContext';
import { UsuarioProvider } from './context/UsuarioContext';


const SignUp = lazy(() => import('./jsx/pages/Registration'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
const Login = lazy(() => import('./jsx/views/Acesso/Login'));


function App () {
        
    let rotasSemLayout = (         
        <Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/page-register' element={<SignUp />} />
			<Route path='/page-forgot-password' element={<ForgotPassword />} />
        </Routes> 
    );
   
		return (
			<>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }>
                    <UsuarioProvider>                      
                        <CarrinhoProvider>
                            <Index /> 
                        </CarrinhoProvider>
                    </UsuarioProvider>
                    
                    {rotasSemLayout}
                    <ToastContainer />
                </Suspense>
            </>
        );
};

export default App; 