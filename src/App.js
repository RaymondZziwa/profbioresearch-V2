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

import { useContext, useRef, useEffect } from 'react';
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


import MakeProjectsOrder from './components/Masanafu/Custodian/make_projects_order';
import AddmachineryData from './components/Masanafu/projects/machinery/add_machinery_data';
import MachineryMenu from './components/Masanafu/projects/other_menus/machinery_menu';
import RegisterMaterial from './components/Masanafu/projects/register_materials/register_equipment';
import SaveNewProject from './components/Masanafu/projects/machinery/saveNewProject';
import ShopDashboard from './components/Masanafu/shop/shopDashboard';
import POS from './components/Masanafu/shop/point_of_sale/pos'
import RegisterShopInventory from './components/Masanafu/shop/register_shop_inventory/register_shop_inventory';
import StartBatchFromMotherGarden from './components/Masanafu/farm/batch_manager/start_batch_from_mother_garden';
import ProjectsRecords from './components/Masanafu/projects/records/projects_records';
import RequestEquipment from './components/Masanafu/projects/request_materials/request_equipment';
import ProjectsEquipmentRequests from './components/Masanafu/Custodian/project_equipment_requests';
import ProjectsRequestsRecords from './components/Masanafu/Custodian/projects_requests_records';
import FarmRequestsRecords from './components/Masanafu/Custodian/farm_requests_records';
import OrderDelivery from './components/Masanafu/projects/order_delivery/order_delivery';
import ReportsMenu from './components/Masanafu/shop/other_menus/reports_menu';
import InventoryManagementMenu from './components/Masanafu/shop/other_menus/inventory_mgt_menu';
import RecordShopExpenditure from './components/Masanafu/shop/expenditure/record_shop_expenditures';
import ManageExternalReceipts from './components/Masanafu/shop/external_receipts/manage_external_receipts';
import ShopStockTaking from './components/Masanafu/shop/shop_stock_taking/stock_taking';
import ShopInventoryRecords from './components/Masanafu/shop/shop_inventory_records/shop_inventory_records';
import ShopRestockingForm from './components/Masanafu/shop/shop_restocking/shop_restocking_form';
import SalesReport from './components/Masanafu/shop/reports/sales_report/sales_report';
import ExpensesReport from './components/Masanafu/shop/reports/expenses_report/expenses_report';
import SalesVsExpenditureReport from './components/Masanafu/shop/reports/sales_vs_expenses_report/sales_v_expenditure_report';
import ShopSalesRecords from './components/Masanafu/shop/records/sales_records';
import ShopExpensesRecords from './components/Masanafu/shop/records/expenditure_records';
function App() {
  const authCtx = useContext(AuthContext);
  const logoutTimerIdRef = useRef(null);

useEffect(() => {
  const logoutUser = () => {
    localStorage.clear()
  }
  const autoLogout = () => {
    if (document.visibilityState === 'hidden') {
      const timeOutId = window.setTimeout(logoutUser, 100 * 60 * 1000);
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
          {/* {authCtx.isLoggedIn && (<Route path="/pendingprojectsorders">
            <PendingProjectOrders />
          </Route>)}     */}
          {/* {authCtx.isLoggedIn && (<Route path="/ordersstatus">
            <OrderStatus />
          </Route>)} */}
          {authCtx.isLoggedIn && (<Route path="/makeprojectsorder">
            <MakeProjectsOrder />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/managemachinerydata">
            <AddmachineryData />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/machinerymenu">
            <MachineryMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/registerequipment">
            <RegisterMaterial />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/registerproject">
            <SaveNewProject />
          </Route>)}      
          {authCtx.isLoggedIn && (<Route path="/shopmanagerdashboard">
            <ShopDashboard />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/pointofsale">
            <POS />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/registershopinventory">
            <RegisterShopInventory />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/startbatchfrommothergarden">
            <StartBatchFromMotherGarden />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/projectsrecords">
            <ProjectsRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/projectsrequests">
            <ProjectsEquipmentRequests />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/requestprojectsequipment">
            <RequestEquipment />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/projectsrequestsrecords">
            <ProjectsRequestsRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/farmrequestsrecords">
            <FarmRequestsRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/orderdelivery">
            <OrderDelivery />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopinventorymenu">
            <InventoryManagementMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopreportsmenu">
            <ReportsMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/recordmasanafushopexpenditure">
            <RecordShopExpenditure />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/manageexternalreceipts">
            <ManageExternalReceipts />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/shopstocktaking">
            <ShopStockTaking />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopinventoryrecords">
            <ShopInventoryRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushoprestockingform">
            <ShopRestockingForm />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopsalesreport">
            <SalesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopexpensesreport">
            <ExpensesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopsalesvexpenditurereport">
            <SalesVsExpenditureReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopsalesrecords">
            <ShopSalesRecords />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/masanafushopexpenditurerecords">
            <ShopExpensesRecords />
          </Route>)}
      </BrowserRouter>
    </div>
  );
}

export default App;
