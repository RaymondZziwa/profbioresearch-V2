import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../side navbar/sidenav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import productOrdersContext from '../../../store/productOrders-context';

const Managerdashboard = () => {
    const [OrdersList, setOrdersList] = useState()
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)
    const [totalNumberOfPendingOrders, setTotalNumberOfPendingOrders] = useState(0)

    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/pendingproductionorders', {
            token: localStorage.getItem("token")
        })
        setOrdersList(res.data)
        setTotalNumberOfPendingOrders(OrdersList.length)
        setisOrdersListLoading(false)
    }

    useEffect(() => {
        fetchOrders()
        const interval = setInterval(() => {
            fetchOrders()
        }, 3000)


        return () => clearInterval(interval)
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
                            <Link className="tab_nav" to="/approvedorders">
                                <div className="mb-3 mclickable_option">
                                    Pending Product Orders <p style={{ borderRadius: '80%', backgroundColor: 'red', textAlign: 'center', display: 'inline-block', width: '22px', color: 'white' }}>{totalNumberOfPendingOrders}</p>
                                </div>
                            </Link>
                            <Link className="tab_nav" to="#">
                                <div className="mb-3 mclickable_option">
                                    Production Records
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/stocktaking">
                                <div className="mb-3 mclickable_option">
                                    Stock Taking (Production Store)
                                </div>
                            </Link>
                            <Link className="tab_nav" to="/requestrawmaterials">
                                <div className="mb-3 mclickable_option">
                                    Request for raw materials
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
    );
}
export default Managerdashboard 