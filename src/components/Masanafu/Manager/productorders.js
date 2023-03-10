import { Row, Col } from "react-bootstrap";
import Navbar from "../../side navbar/sidenav";
import { useState } from "react";
import axios from "axios";
const ProductOrders = () => {
    const [isLoading, setisLoading] = useState(true)
    const [Data, setData] = useState()

  
    return (
        <>
            <div className='container-fluid'>
                <Row>
                    <Col sm='12' md='2' lg='2' xl='2'></Col>
                    <Col sm='12' md='8' lg='8' xl='8'>
                        <table className="table table-dark" style={{marginTop:'100px'}}>
                        <thead>
                            <tr>
                                <th scope="col">Order Id</th>
                                <th scope="col">Date</th>
                                <th scope="col">Source Branch</th>
                                <th scope="col">Order By</th>
                                <th scope="col">Destination Branch</th>
                                <th scope="col">Delivered To</th>
                                <th scope="col">Items Ordered</th>
                                <th scope="col">Current Order Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {isLoading ? <tr><td>Loading orders</td></tr> :
                            Data.map(item => (
                                <tr>
                                    <td>{item.orderid}</td>
                                    <td>{item.date}</td>
                                    <td>{item.sourcebranch}</td>
                                    <td>{item.orderby}</td>
                                    <td>{item.destinationbranch}</td>
                                    <td>{item.deliveredto}</td>
                                    <td>{item.itemsordered}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button className="btn btn-outline-danger">Reject</button>
                                        <button className="btn btn-outline-Success">Approve</button>
                                    </td>
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

export default ProductOrders