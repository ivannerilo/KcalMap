import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Register from './register/Register';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import './App.css';
import ProfileForm from './profileForm/ProfileForm';
import {AuthenticateContext} from '../contexts/AuthenticateContext';
import { MealsContext } from '../contexts/MealsContext';

export default function App() {
  // Requisição para backend, para verificar se está logado ou não!

  return (
    <AuthenticateContext>
      <MealsContext>
      <div>
        <h1>KCalculator</h1>

        <BrowserRouter>
          <Routes>

            {/* Rotas Autenticadas */}
            <Route path="/" element={<AuthenticationLayout/>}>
              <Route index element={<Dashboard />} />
            </Route>

            {/* Se já estiver logado, redirecionar ao perfil */}
            <Route path="profile-form" element={<ProfileForm />} /> 

            {/* Rotas Login / Register */}
            <Route path="/login" element={<Login />}  />
            <Route path="/register" element={<Register />}  />

            {/* Rota NOT FOUND */}
            <Route path="*" element={<h1>Not Found</h1>} /> 
          </Routes>
        </BrowserRouter>
      </div>
      </MealsContext>
    </AuthenticateContext>
  );
}
