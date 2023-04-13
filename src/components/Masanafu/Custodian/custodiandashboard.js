import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../side navbar/sidenav";
import { useEffect, useState } from "react";
import axios from "axios";

const CustodianDashboard = () => {
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)
    const [totalNumberOfPendingOrders, setTotalNumberOfPendingOrders] = useState(0)
    const [totalNumberOfPendingRequests, setTotalNumberOfPendingRequests] = useState()
    const [isRequestsListLoading, setIsRequestsListLoading] = useState(true)

    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/pendingorders', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data === 'string'){
            setTotalNumberOfPendingOrders(0)
        }else{
            setisOrdersListLoading(false)
            setTotalNumberOfPendingOrders(res.data.length)
        }        
    }

    useEffect(() => {
        fetchOrders()
        const interval = setTimeout(() => {
            fetchOrders()
        }, 100)


        return () => clearTimeout(interval)
    })

    const fetchRawMaterialRequests = async () => {
        const res = await axios.post('http://82.180.136.230:3005/pendingrawmaterialrequests', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        if(typeof res.data === 'string'){
            setTotalNumberOfPendingRequests(0)
        }else{
            setIsRequestsListLoading(false)
            setTotalNumberOfPendingRequests(res.data.length)
        }
        
    }

    useEffect(() => {
        fetchRawMaterialRequests()
        const interval = setTimeout(() => {
            fetchRawMaterialRequests()
        }, 100)


        return () => clearTimeout(interval)
    })
    
    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='1' md='1' lg='1' xl='1'></Col>
                <Col sm='12' md='7' lg='7' xl='7'>
                    <div>
                        <div style={{ padding: "30px", borderRadius: "10px" }}>
                            <Link className="tab_nav" to="/inventorymenu">
                                <div className="mb-3 mclickable_option">
                                    Inventory
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/rawmaterialrequests">
                                <div className="mb-3 mclickable_option">
                                    Raw Material Requests <p style={{ borderRadius: '80%', backgroundColor: 'red', textAlign: 'center', display: 'inline-block', width: '22px', color: 'white' }}>{totalNumberOfPendingRequests}</p>
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/rawmaterialrequestsrecords">
                                <div className="mb-3 mclickable_option">
                                    Raw Material Requests Records
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/productionrecords">
                                <div className="mb-3 mclickable_option">
                                    Production Records
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/productorders">
                                <div className="mb-3 mclickable_option">
                                    Production Orders <p style={{ borderRadius: '80%', backgroundColor: 'red', textAlign: 'center', display: 'inline-block', width: '22px', color: 'white' }}>{totalNumberOfPendingOrders}</p>
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/orderrecords">
                                <div className="mb-3 mclickable_option">
                                    Orders Records
                                </div>
                            </Link>
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
                            <Link className="tab_nav" to="/exhibtionrecords">
                                <div className="mb-3 mclickable_option">
                                    Exhibition Records
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