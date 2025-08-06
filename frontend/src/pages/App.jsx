import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Register from './register/Register';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import styles from './App.css';
import ProfileForm from './profileForm/ProfileForm';
import ProfileFormLayout from './profileForm/ProfileFormLayout';
import {AuthenticateContext} from '../contexts/AuthenticateContext';
import { UserContext } from '../contexts/UserContext';
import { FetchContext } from '../hooks/useFetch';
import { FoodContext } from '../contexts/FoodContext';


export default function App() {
  // Requisição para backend, para verificar se está logado ou não!
  return (
      <AuthenticateContext>
        <FetchContext>
            <UserContext>
              <FoodContext>

                  <BrowserRouter>
                    <Routes>

                      {/* Rotas Autenticadas */}
                      <Route path="/" element={<AuthenticationLayout/>}>
                        <Route index element={<Dashboard />} />
                      </Route>

                      {/* Se já estiver logado, redirecionar ao perfil */}
                      <Route path="profile-form" element={<ProfileFormLayout />}>
                        <Route index  element={<ProfileForm />} />
                      </Route> 

                      {/* Rotas Login / Register */}
                      <Route path="/login" element={<Login />}  />
                      <Route path="/register" element={<Register />}  />

                      {/* Rota NOT FOUND */}
                      <Route path="*" element={<h1>Not Found</h1>} /> 
                    </Routes>
                  </BrowserRouter>

              </FoodContext>
            </UserContext>
        </FetchContext>
      </AuthenticateContext>
  );
}
