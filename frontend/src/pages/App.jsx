import {AuthenticateContext} from 'contexts/AuthenticateContext';
import { UserContext } from 'contexts/UserContext';
import { FetchContext } from 'hooks/useFetch';
import { FoodContext } from 'contexts/FoodContext';
import WindowContext from 'contexts/WindowContext';
import AppRoute from 'pages/AppRoute';

export default function App() {
  // Requisição para backend, para verificar se está logado ou não!

  return (
    <WindowContext>
      <AuthenticateContext>
        <FetchContext>
            <UserContext>
              <FoodContext>
                <AppRoute />
              </FoodContext>
            </UserContext>
        </FetchContext>
      </AuthenticateContext>
    </WindowContext>
  );
}
