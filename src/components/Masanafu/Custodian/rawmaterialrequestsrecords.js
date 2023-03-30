import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState, useEffect } from "react";
import axios from "axios";
import RawMaterialRequests from "./rawmaterialrequests";

const RawMaterialRequestsRecords = () => {
    const [ordersList, setOrdersList] = useState()
    const [isOrdersListLoading, setisOrdersListLoading] = useState(true)

    const fetchOrders = async () => {
        const res = await axios.post('http://82.180.136.230:3005/rawmaterialrequestsrecords', {
            branch: localStorage.getItem("branch"),
            token: localStorage.getItem("token")
        })
        setOrdersList(res.data)
        setisOrdersListLoading(false)
    }

    useEffect(() => {
        fetchOrders()
        const interval = setInterval(() => {
            fetchOrders()
        }, 5000)


        return () => clearInterval(interval)
    })
    return (
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                        <table className="table table-dark" style={{ marginTop: '100px' }}>
                            <thead >
                                <tr>
                                    <th scope="col">Requisition Id</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Request From (Department)</th>
                                    <th scope="col">Request From (Role)</th>
                                    <th scope="col">Request From (user)</th>
                                    <th scope="col">Items Requested</th>
                                    <th scope="col">Current Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isOrdersListLoading && ordersList.map(item => (
                                    <tr>
                                        <td>{item.requisitionid}</td>
                                        <td>{item.date}</td>
                                        <td>{item.orderid}</td>
                                        <td>{item.requesterdepartment}</td>
                                        <td>{item.requesterrole}</td>
                                        <td>{item.requestedby}</td>
                                        <td>
                                            <table className="table table-dark" style={{ marginTop: '2px' }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Units Of Measurement</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: 'center' }}>
                                                    {JSON.parse(item.itemsrequested).map(itemrequested =>
                                                        <tr>
                                                            <td>{itemrequested.itemName}</td>
                                                            <td>{itemrequested.itemQuantity}</td>
                                                            <td>{itemrequested.mUnits}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>{item.status}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </Col>
                    <Col sm='12' md='2' lg='2' xl='2'>
                        <Navbar />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default RawMaterialRequestsRecords