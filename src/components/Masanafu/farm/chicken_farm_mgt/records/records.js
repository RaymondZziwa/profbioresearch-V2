import { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Navbar from '../../../../side navbar/sidenav'

const ChickenBatchRecords = () => {
    const [isLoading, setIsLoading] = useState([])
    const [chickenBatches, setChickenBatches] = useState([])

    const fetchBatchData = async () => {
        const res = await axios.post('http://82.180.136.230:3005/fetchallbatchdata', {
            token: localStorage.getItem("token")
        })
        if(Array.isArray(res.data)){
            setIsLoading(false)
            setChickenBatches(res.data)
        }
    }

    useEffect(()=>{
        fetchBatchData()
    },[])

    return(
        <Row>
            <Col sm='12' md='2' lg='2' xl='2'>
                <Navbar />
            </Col>
            <div className="col align-self-center" style={{marginTop:'60px'}}>
                <h1 style={{textAlign:'center'}}>Batch Data Records</h1>
                <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Batch Registration Date</th>
                                <th scope="col">Batch Number</th>
                                <th scope="col">Number Of Chicken</th>
                                <th scope="col">Chicken Unit Price</th>
                                <th scope="col">Total Spent</th>
                                <th scope="col">Notes</th>
                                <th scope="col">Batch Status</th>
                                <th scope="col">Alive Chicken</th>
                                <th scope="col">Chicken Lost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? <tr><td colSpan="7" style={{textAlign:'center'}}>Loading.....</td></tr> :
                                chickenBatches.map(item => (
                                    <tr>
                                        <td>{item.date}</td>
                                        <td>{item.batchnumber}</td>
                                        <td>{item.numberofchicken}</td>
                                        <td>{item.chickenunitprice}</td>
                                        <td>{item.totalspent}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.status}</td>
                                        <td>{item.chickenalive}</td>
                                        <td>{item.chickendead}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
            </div>
            <Col sm='12' md='2' lg='2' xl='2'></Col>
        </Row>
    )
}

export default ChickenBatchRecords