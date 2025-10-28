import {AuthenticateContext} from 'contexts/AuthenticateContext';
import { UserContext } from 'contexts/UserContext';
import { FetchContext } from 'hooks/useFetch';
import { FoodContext } from 'contexts/FoodContext';
import WindowContext from 'contexts/WindowContext';
import AppRoute from 'pages/AppRoute';
import {PopupContext} from "../contexts/PopupContext";

export default function App() {
  return (
    <WindowContext>
      <PopupContext>
          <AuthenticateContext>
            <FetchContext>
                <UserContext>
                  <FoodContext>
                            <AppRoute />
                  </FoodContext>
                </UserContext>
            </FetchContext>
          </AuthenticateContext>
      </PopupContext>
    </WindowContext>
  );
}
