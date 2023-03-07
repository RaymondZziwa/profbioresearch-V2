import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import Login from './components/authentication/login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Namungoonadashboard from './components/Namungoona/supervisor dashboard/namungoonadasboard';
import Saveinventoryrecords from './components/Namungoona/inventory records/saveinventoryrecords';
import Stocktaking from './components/Namungoona/stock taking/sotcktaking';
import Manageinventory from './components/Namungoona/inventory crud/manageinventory';
import Viewinventoryrecords from './components/Namungoona/inventory records/viewinventoryrecords';
import Registerpersonnel from './components/Admin/personnel registration/registerpersonnel';
import Admindashboard from './components/Admin/admin dashboard/adminDashboard';

import Managerdashboard from './components/Masanafu/Manager/managerdashboard';

import { useContext } from 'react';
import AuthContext from './store/auth-context';
import InventoryMenu from './components/Masanafu/Manager/inventorymenu';
import CustodianDashboard from './components/Masanafu/Custodian/custodiandashboard';
import Exhibitionmanagement from './components/Masanafu/Custodian/exhibition/exhibition';

function App() {
  const authCtx = useContext(AuthContext);
  const client = new QueryClient()
  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={client}>
          {!authCtx.isLoggedIn && (<Route path="/Login" >
            <Login />
          </Route>
          )}
          {!authCtx.isLoggedIn && (
            <Redirect to='/Login' />
          )}

          {authCtx.isLoggedIn && (
            <Route path="/namungoonadashboard">
              <Namungoonadashboard />
            </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/saveinventoryrecords">
            <Saveinventoryrecords />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/stocktaking">
            <Stocktaking />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/manageinventory">
            <Manageinventory />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/viewinventoryrecords">
            <Viewinventoryrecords />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/registerpersonnel">
            <Registerpersonnel />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/admindashboard">
            <Admindashboard />
          </Route>
          )}
          {/* <Route path="*">
            <Redirect to='/Login' />
          </Route> */}

          {authCtx.isLoggedIn && (<Route path="/managerdashboard">
            <Managerdashboard />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/inventorymenu">
            <InventoryMenu />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/custodiandashboard">
            <CustodianDashboard />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/exhibtionmanagement">
            <Exhibitionmanagement />
          </Route>
          )}
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
