import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import { initializeApp } from "firebase/app";
import chaves from './chaves';
import Agendamentos from './views/Agendamentos';
import Atendimento from './views/Atendimento';
import CadastroPacientes from './views/CadastroPacientes';
import { EstadoComponent } from './context/EstadoGlobal';

const { apikey, messagingSenderId, appId, measurementId } = chaves;

const firebaseConfig = {
  apiKey: apikey,
  authDomain: "clinsys-wst.firebaseapp.com",
  projectId: "clinsys-wst",
  storageBucket: "clinsys-wst.appspot.com",
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};
initializeApp(firebaseConfig)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Dashboard />,
  },
  {
    path: "/agendamentos",
    element: <Agendamentos />,
  },
  {
    path: "/atendimento",
    element: <Atendimento />,
  },
  {
    path: "/cadastropacientes",
    element: <CadastroPacientes />,
  },
]);

export default function App() {

  return (
      <RouterProvider router={router} />
  )
}

