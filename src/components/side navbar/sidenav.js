import { Link } from "react-router-dom"
import Logout from "../authentication/logout"
import logo from "../../imgs/logo.png";
import './sidenav.css'
const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top" style={{ marginBottom: '50px' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" href="#"><img src={logo} alt='logo' style={{ height: '20px' }} />{localStorage.getItem("branch")} Branch - {localStorage.getItem('department')} {localStorage.getItem('role')}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Prof Bioresearch - {localStorage.getItem('branch')}</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {localStorage.getItem('branch') === 'namungoona' &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/namungoonadashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/manageinventory">Manage Inventory</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/saveinventoryrecords">Save Inventory Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">Place Order</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/viewinventoryrecords">View Inventory Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/stocktaking">Stock Taking</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link "  to='/accountsettings'>Settings</Link>
                  </li>
                </>
              }

              {(localStorage.getItem('branch') === 'masanafu' && localStorage.getItem('department') === 'production' && localStorage.getItem('role') === 'manager') &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/managerdashboard'>Dashboard</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Inventory
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li><Link className="nav-link" to="/manageinventory">Save Production Item</Link></li>
                      <li><Link className="nav-link" to="/saveinventoryrecords">Save Production Inventory Records</Link></li>
                      <li><Link className="nav-link" to="/viewinventoryrecords">View Production Inventory Records</Link></li>
                      <li>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/saveinventoryrecords">Inventory Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/viewinventoryrecords">View Inventory Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/stocktaking">Stock Taking</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link"  to='/accountsettings'>Settings</Link>
                  </li>
                </>
              }

              {(localStorage.getItem('branch') === 'masanafu' && localStorage.getItem('department') === 'production' && localStorage.getItem('role') === 'custodian') &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/custodiandashboard'>Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to=''>Raw Material Requests <p style={{ borderRadius: '80%', backgroundColor: 'red', textAlign: 'center', display: 'inline-block', width: '22px', color: 'white' }}>0</p></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to=''>Production Orders</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to=''>Orders Records</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to='/exhibtionmanagement'>Exhibition Management</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/stocktaking">Stock Taking</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to='/accountsettings'>Settings</Link>
                  </li>
                </>
              }
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {localStorage.getItem("username")}
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark">
                  {/* <li><Editprofile /></li> */}
                  <li><Logout /></li>
                  <li>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar