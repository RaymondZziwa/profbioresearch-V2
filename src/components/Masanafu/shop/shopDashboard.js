import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { Link } from "react-router-dom";

const ShopDashboard = () => {
return(
    <Row>
    <Col sm='12' md='2' lg='2' xl='2'>
        <Navbar />
    </Col>
    <div className="col align-self-center" style={{marginTop:'20px'}}>
        <Link className="tab_nav" to="/masanafushopinventorymenu">
            <div className="mb-3 mclickable_option">
                Manage Shop Inventory
            </div>
        </Link>
        <Link className="tab_nav" to="/manageexternalreceipts">
            <div className="mb-3 mclickable_option">
                Retrieve/Manage External Receipts
            </div>
        </Link>
        <Link className="tab_nav" to="/pointofsale">
            <div className="mb-3 mclickable_option">
                Point Of Sale
            </div>
        </Link>

        <Link className="tab_nav" to="/recordmasanafushopexpenditure">
            <div className="mb-3 mclickable_option">
                Record Shop Expenditures
            </div>
        </Link>
        <Link className="tab_nav" to="/masanafushopreportsmenu">
            <div className="mb-3 mclickable_option">
                Shop Reports
            </div>
        </Link>
        <Link className="tab_nav" to="/masanafushopsalesrecords">
            <div className="mb-3 mclickable_option">
                Sales Records
            </div>
        </Link>
        <Link className="tab_nav" to="/masanafushopexpenditurerecords">
            <div className="mb-3 mclickable_option">
                Expenditure Records
            </div>
        </Link>
        <Link className="tab_nav" to="/accountsettings">
            <div className="mb-3 mclickable_option">
                Settings
            </div>
        </Link>
    </div>
    <Col sm='12' md='2' lg='2' xl='2'>
    </Col>
</Row>
)
}

export default ShopDashboard