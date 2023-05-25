import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import Login from './components/authentication/login';
import Namungoonadashboard from './components/Namungoona/supervisor dashboard/namungoonadasboard';
import Saveinventoryrecords from './components/Namungoona/inventory records/saveinventoryrecords';
import Stocktaking from './components/Namungoona/stock taking/sotcktaking';
import Manageinventory from './components/Namungoona/inventory crud/manageinventory';
import Viewinventoryrecords from './components/Namungoona/inventory records/viewinventoryrecords';
import Registerpersonnel from './components/Admin/personnel registration/registerpersonnel';
import Admindashboard from './components/Admin/admin dashboard/adminDashboard';
import Managerdashboard from './components/Masanafu/Manager/managerdashboard';

import { useContext, useRef, useState, useEffect } from 'react';
import AuthContext from './store/auth-context';
import InventoryMenu from './components/Masanafu/Manager/inventorymenu';
import CustodianDashboard from './components/Masanafu/Custodian/custodiandashboard';
import Exhibitionmanagement from './components/Masanafu/Custodian/exhibition/exhibition';
import AccountSettings from './components/settings/settings';
import ProductOrders from './components/Masanafu/Manager/productorders';
import RequestRawMaterialsForm from './components/Masanafu/Manager/requestrawmaterials';
import PlaceOrderForm from './components/Namungoona/place order/placeorder';
import OrderRecords from './components/Masanafu/Manager/orderRecords';
import ExhibitionRecords from './components/Masanafu/Custodian/exhibitionrecords';
import ApprovedOrders from './components/Masanafu/Manager/approvedorders';
import RawMaterialRequests from './components/Masanafu/Custodian/rawmaterialrequests';
import RawMaterialRequestsRecords from './components/Masanafu/Custodian/rawmaterialrequestsrecords';
import ProductionRecords from './components/Masanafu/Manager/productionrecords';
import BranchOrderRecords from './components/Masanafu/Manager/branchorderrecords';
import FarmDashboard from './components/Masanafu/farm/farmdashboard';
import RequestSeeds from './components/Masanafu/farm/seed_requisition/request_seeds';
import ManageBatch from './components/Masanafu/farm/batch_manager/batch_manager'
import ViewBatchRecords from './components/Masanafu/farm/batch_manager/view_batch_records';
import RequisitionStatus from './components/Masanafu/farm/seed_requisition/requistion_status';
import FarmRequests from './components/Masanafu/Custodian/farm_requests';
import ProjectsManagerDashboard from './components/Masanafu/projects/projectsdashboard';
import MaterialCalculator from './components/Masanafu/projects/material_calculator/material_calculator';
import PendingProjectOrders from './components/Masanafu/projects/new_orders/pending_orders';
import OrderStatus from './components/Masanafu/projects/orders_status/order_status';
import MakeProjectsOrder from './components/Masanafu/Custodian/make_projects_order';
import AddmachineryData from './components/Masanafu/projects/machinery/add_machinery_data';

function App() {
  const authCtx = useContext(AuthContext);
  const logoutTimerIdRef = useRef(null);

useEffect(() => {
  const logoutUser = () => {
    localStorage.clear()
  }
  const autoLogout = () => {
    if (document.visibilityState === 'hidden') {
      const timeOutId = window.setTimeout(logoutUser, 1 * 60 * 1000);
      logoutTimerIdRef.current = timeOutId;
    } else {
      window.clearTimeout(logoutTimerIdRef.current);
    }
  };

  document.addEventListener('visibilitychange', autoLogout);

  return () => {
    document.removeEventListener('visibilitychange', autoLogout);
  };
}, []);

  return (
    <div className="App">
      <BrowserRouter>
          {!authCtx.isLoggedIn && (<Route path="/Login" >
            <Login />
          </Route>
          )}
          {!authCtx.isLoggedIn && (
            <Redirect to='/Login' />
          )}

          {/* {authCtx.isLoggedIn && (<Route path="*">
            <Redirect to={localStorage.getItem('home')} />
          </Route> )
          } */}

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

            {authCtx.isLoggedIn && (
              <Route path="/managerdashboard">
                <Managerdashboard />
              </Route>
            )}

            {authCtx.isLoggedIn && (<Route path="/productorders">
              <ProductOrders />
            </Route>
            )}

          {authCtx.isLoggedIn && (
            <Route path="/inventorymenu">
              <InventoryMenu />
            </Route>
          )}


          {authCtx.isLoggedIn && (
            <Route path="/custodiandashboard">
              <CustodianDashboard />
            </Route>
          )}

          {authCtx.isLoggedIn && (
            <Route path="/exhibtionmanagement">
              <Exhibitionmanagement />
            </Route>
          )}

          {authCtx.isLoggedIn && (
            <Route path="/exhibtionrecords">
              <ExhibitionRecords />
            </Route>
          )}

          {authCtx.isLoggedIn && (<Route path="/accountsettings">
            <AccountSettings />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/requestrawmaterials">
            <RequestRawMaterialsForm />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/placeproductorder">
            <PlaceOrderForm />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/orderrecords">
            <OrderRecords />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/branchorderrecords">
            <BranchOrderRecords />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/approvedorders">
            <ApprovedOrders />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/rawmaterialrequests">
            <RawMaterialRequests />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/rawmaterialrequestsrecords">
            <RawMaterialRequestsRecords />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/productionrecords">
            <ProductionRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/farmmanagerdashboard">
            <FarmDashboard />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/requestseeds">
            <RequestSeeds />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/managebatch">
            <ManageBatch />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/farmrequests">
            <FarmRequests />
          </Route>)}  
          {authCtx.isLoggedIn && (<Route path="/farmrequisitionstatus">
            <RequisitionStatus />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/viewrecords">
            <ViewBatchRecords />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/projectsmanagerdashboard">
            <ProjectsManagerDashboard />
          </Route>)}  
          {authCtx.isLoggedIn && (<Route path="/materialcalculator">
            <MaterialCalculator />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/pendingprojectsorders">
            <PendingProjectOrders />
          </Route>)}    
          {authCtx.isLoggedIn && (<Route path="/ordersstatus">
            <OrderStatus />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/makeprojectsorder">
            <MakeProjectsOrder />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/managemachinerydata">
            <AddmachineryData />
          </Route>)}    
      </BrowserRouter>
    </div>
  );
}

export default App;
