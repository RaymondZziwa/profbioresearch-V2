import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { Link } from "react-router-dom";

const ShopDashboard = () => {
return(
    <Row>
    <Col sm='12' md='4' lg='4' xl='4'>
        <Navbar />
    </Col>
    <div className="col align-self-center" style={{marginTop:'20px'}}>
        <Link className="tab_nav" to="/registershopinventory">
            <div className="mb-3 mclickable_option">
                Register Shop Inventory
            </div>
        </Link>
        <Link className="tab_nav" to="/pointofsale">
            <div className="mb-3 mclickable_option">
                Point Of Sale
            </div>
        </Link>
        <Link className="tab_nav" to="/stocktaking">
            <div className="mb-3 mclickable_option">
                Stock Taking
            </div>
        </Link>
        <Link className="tab_nav" to="/accountsettings">
            <div className="mb-3 mclickable_option">
                Settings
            </div>
        </Link>
    </div>
</Row>
)
}

export default ShopDashboard