import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../side navbar/sidenav";

const CustodianDashboard = () => {
    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='1' md='1' lg='1' xl='1'></Col>
                <Col sm='12' md='7' lg='7' xl='7'>
                    <div>
                        <div style={{ padding: "30px", borderRadius: "10px" }}>
                            <Link className="tab_nav" to="#">
                                <div className="mb-3 mclickable_option">
                                    Raw Material Requests <p style={{ borderRadius: '80%', backgroundColor: 'red', textAlign: 'center', display: 'inline-block', width: '22px', color: 'white' }}>99</p>
                                </div>
                            </Link>
                            <Link className="tab_nav" to="#">
                                <div className="mb-3 mclickable_option">
                                    Production Records
                                </div>
                            </Link>
                            <Link className="tab_nav" to="#">
                                <div className="mb-3 mclickable_option">
                                    Orders Records
                                </div>
                            </Link>
                            {/* <Link className="tab_nav" to="#">
                                <div className="mb-3 mclickable_option">
                                    Production Inventory Records
                                </div>
                            </Link> */}
                            <Link className="tab_nav" to="/stocktaking">
                                <div className="mb-3 mclickable_option">
                                    Stock Taking (General Store)
                                </div>
                            </Link>

                            <Link className="tab_nav" to="/exhibtionmanagement">
                                <div className="mb-3 mclickable_option">
                                    Exhibition Management
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/accountsettings">
                                <div className="mb-3 mclickable_option">
                                    Settings
                                </div>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <Navbar />
                </Col>
            </Row>
        </div>
    )
}

export default CustodianDashboard