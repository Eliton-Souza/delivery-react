import React from 'react'
//import { dadosUsuário } from './services/api';

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Logout = React.lazy(() => import('./views/logout'));


const CadastrarLider= React.lazy(() => import('./views/CadastrarLider'));

const NaoAutorizado= React.lazy(() => import('./jsx/components/Dashboard/Home'));

//const usuario= dadosUsuário();


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  //secretaria
  { path: '/naoautorizado', name: 'NaoAutorizado', element: NaoAutorizado },
  { path: '/lider', name: 'Lideres', element: usuario.id_clube=='8'? CadastrarLider : NaoAutorizado},


  


  { path: '/logout', name: 'Logout', element: Logout },
]

export default routes
