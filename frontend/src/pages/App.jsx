import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Register from './register/Register';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import './App.css';
import ProfileForm from './profileForm/ProfileForm';
import ProfileFormLayout from './profileForm/ProfileFormLayout';
import SidebarLayout from '../layouts/sidebarLayout/SidebarLayout';
import {AuthenticateContext} from '../contexts/AuthenticateContext';
import { UserContext } from '../contexts/UserContext';
import { FetchContext } from '../hooks/useFetch';
import { FoodContext } from '../contexts/FoodContext';
import WindowContext from '../contexts/WindowContext';


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
                      
                        <Route path="/" element={<SidebarLayout />}>
                          <Route path="dashboard" element={<Dashboard />} />
                          <Route path="profile" element={<h1>profile</h1>} />
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
