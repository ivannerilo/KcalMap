import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from 'pages/dashboard/Dashboard';
import Login from 'pages/login/Login';
import Register from 'pages/register/Register';
import AuthenticationLayout from 'layouts/AuthenticationLayout';
import './App.css';
import ProfileForm from 'pages/profileForm/ProfileForm';
import ProfileFormLayout from 'pages/profileForm/ProfileFormLayout';
import BarLayout from 'layouts/barLayout/BarLayout';
import {AuthenticateContext} from 'contexts/AuthenticateContext';
import { UserContext } from 'contexts/UserContext';
import { FetchContext } from 'hooks/useFetch';
import { FoodContext } from 'contexts/FoodContext';
import WindowContext from 'contexts/WindowContext';
import Profile from 'pages/profile/Profile';


export default function App() {
  // Requisição para backend, para verificar se está logado ou não!

  return (
    <WindowContext>
      <AuthenticateContext>
        <FetchContext>
            <UserContext>
              <FoodContext>


                  <BrowserRouter>
                    <Routes>

                      {/* Rotas Login / Register */}
                      <Route path="/login" element={<Login />}  />
                      <Route path="/register" element={<Register />}  />
        
                      {/* Se já estiver logado, redirecionar ao perfil */}
                      <Route path="profile-form" element={<ProfileFormLayout />}>
                        <Route index  element={<ProfileForm />} />
                      </Route>

                      {/* Rotas Autenticadas */}
                      <Route element={<AuthenticationLayout />}>
                      
                        <Route path="/" element={<BarLayout />}>
                          {/* Redireciona o user para a rota "padrão" se ele acessar sem nenhuma rota */}
                          <Route index element={<Navigate to="/dashboard" />} />
                          <Route path="dashboard" element={<Dashboard />} />
                          <Route path="profile" element={<Profile />} />
                          <Route path="foods" element={<h1>foods</h1>} />
                          <Route path="results" element={<h1>results</h1>} />
                          <Route path="friends" element={<h1>friends</h1>} />
        
                        </Route>
                      
                      </Route>

                      {/* Rota NOT FOUND */}
                      <Route path="*" element={<h1>Not Found</h1>} /> 

                    </Routes>
                  </BrowserRouter>


              </FoodContext>
            </UserContext>
        </FetchContext>
      </AuthenticateContext>
    </WindowContext>
  );
}
