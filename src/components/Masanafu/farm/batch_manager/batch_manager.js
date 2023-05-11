import axios from "axios"
import { useEffect } from "react"
import { Row, Col, Form } from "react-bootstrap";
import Navbar from "../../../side navbar/sidenav";

const UpdateBatchStatus = () => {
    const fetchAllRequisitionNumbers = async () => {
        const res = await axios.post('http://82.180.136.230:3005/farmrequisitionnumbers', {
            token: localStorage.getItem('token')
        })
    }

    useEffect(() => {
        fetchAllRequisitionNumbers()
    }, [])
    
    return(
            <Row>
                <Col sm='12' md='2' lg='2' xl='2'>
                    <Navbar />
                </Col>
                <Col className="col align-self-center" style={{marginTop:'60px'}}>
                    <h3 style={{textAlign:'center'}}>Update Batch Status</h3>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required />
                        <label for="floatingInput">Batch Number</label>
                    </div>
                    <input placeholder="items" readOnly/>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required readOnly/>
                        <label for="floatingInput">Current Batch Status</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required/>
                        <label for="floatingInput">New Batch Status</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required readOnly/>
                        <label for="floatingInput">Current Quantity</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required/>
                        <label for="floatingInput">New Quantity</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} required/>
                        <label for="floatingInput">Damages</label>
                    </div>
                    <div className="mb-3" style={{ textAlign: 'center' }}>
                        <button style={{ width: "50%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }} >UPDATE</button>
                    </div>
                </Col>
            </Row>
    )
}

export default UpdateBatchStatus