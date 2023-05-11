import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../side navbar/sidenav";
import { useEffect, useState } from "react";
import axios from "axios";

const FarmDashboard = () => {
    return (
        <Row>
            <Col sm='12' md='4' lg='4' xl='4'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'20px'}}>
                <Link className="tab_nav" to="/requestseeds">
                    <div className="mb-3 mclickable_option">
                        Request Seeds Or Seedlings
                    </div>
                </Link>
                <Link className="tab_nav" to="/batchstatus">
                    <div className="mb-3 mclickable_option">
                        Update Batch Status
                    </div>
                </Link>
                <Link className="tab_nav" to="/">
                    <div className="mb-3 mclickable_option">
                        Monitor Active Batches
                    </div>
                </Link>
                <Link className="tab_nav" to="/">
                    <div className="mb-3 mclickable_option">
                        View Farm Records
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

export default FarmDashboard