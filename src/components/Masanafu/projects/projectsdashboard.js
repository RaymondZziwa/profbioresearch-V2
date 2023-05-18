import { Row, Col } from 'react-bootstrap'
import Navbar from '../../side navbar/sidenav'
import { Link } from "react-router-dom";

const ProjectsManagerDashboard = () => {
    return (
        <Row>
            <Col sm='12' md='4' lg='4' xl='4'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
                <Link className="tab_nav" to="/">
                    <div className="mb-3 mclickable_option">
                        Request Materials
                    </div>
                </Link>
                <Link className="tab_nav" to="/materialcalculator">
                    <div className="mb-3 mclickable_option">
                        Material Calculator
                    </div>
                </Link>
                <Link className="tab_nav" to="/">
                    <div className="mb-3 mclickable_option">
                        New Orders
                    </div>
                </Link>
                <Link className="tab_nav" to="/ordersstatus">
                    <div className="mb-3 mclickable_option">
                        Orders Status
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

export default ProjectsManagerDashboard