import { Row, Col, Form } from "react-bootstrap";
import '../../Namungoona/inventory records/forms.css'
import Navbar from "../../side navbar/sidenav";
import axios from "axios";
import { useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RequestRawMaterialsForm = () => {
    const [status, setStatus] = useState({})
    const [itemList, setitemList] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [orderId, setOrderId] = useState('')
    const [sourceBranch, setsourceBranch] = useState('')
    const [recieversRole, setRecieversRole] = useState('')
    const [itemsRequested, setItemsRequested] = useState([{ itemName: '', itemQuantity: '', mUnits: '' },])
    const [destinationBranch, setdestinationBranch] = useState('')
    const [recievedBy, setrecievedBy] = useState('')

    const removeInput = (index) => {
        const values = [...itemsRequested];
        values.splice(index, 1);
        setItemsRequested(values)
    }
    const addNewInput = () => {
        setItemsRequested([...itemsRequested, { itemName: '', itemQuantity: '', mUnits: '' }])
    }



    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/itemlist', {
            token: localStorage.getItem("token")
        })
        setitemList(res.data)
        setisLoading(false)
    }

    const recievedByInput = event => {
        event.preventDefault()
        setrecievedBy(event.target.value)
    }

    const sourceBranchInput = event => {
        event.preventDefault()
        setsourceBranch(event.target.value)
    }
    const orderIdInput = event => {
        event.preventDefault()
        setOrderId(event.target.value)
    }

    const recieversroleInput = event => {
        event.preventDefault()
        setRecieversRole(event.target.value)
    }

    const handleChangeInput = (index, event) => {
        let values = [...itemsRequested];
        values[index][event.target.name] = event.target.value;
        setItemsRequested(values)
    }
    const saveDataHandler = async event => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:3005/requestrawmaterials', {
            orderId: orderId,
            requesterbranch: localStorage.getItem('branch'),
            requesterrole: localStorage.getItem('role'),
            requestedby: localStorage.getItem('username'),
            requestedfrombranch: sourceBranch,
            recieversRole: recieversRole,
            recievedBy: recievedBy,
            itemsrequested: JSON.stringify(itemsRequested),
            token: localStorage.getItem("token")
        }).then(() => setStatus({ type: 'success' }))
            .catch((err) => setStatus({ type: 'error', err }))
    }

    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='2' md='2' lg='2' xl='2'></Col>
                <Col sm='12' md='8' lg='8' xl='8'>
                    <div className="container  d-flex align-items-center" style={{ marginTop: '50px' }}>
                        <Form>
                            {status?.type === 'success' && <span style={{ margin: '20px' }} class="alert alert-success" role="alert">Transaction saved</span>}
                            {status?.type === 'error' && <span style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error! Transaction was not saved</span>}
                            <div style={{ marginTop: '20px' }}>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} onChange={orderIdInput} required />
                                    <label for="floatingInput">Order-Id</label>
                                </div><br></br>
                                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={sourceBranchInput} required>
                                    <option selected>Select Branch To Request From</option>
                                    <option value="masanafu">Masanafu</option>
                                    <option value="equatorial">Equatorial</option>
                                    <option value="buwama">Buwama</option>
                                    <option value="namungoona">Namungoona</option>
                                </select><br></br>
                                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={recieversroleInput} required>
                                    <option selected>Reciever's Role</option>
                                    <option value="manager">Manager</option>
                                    <option value="custodian">Custodian</option>
                                </select>
                                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={recievedByInput} required>
                                    <option selected>Recieved By</option>
                                    <option value="demo">Roger</option>
                                    <option value="demo">Patrick</option>
                                </select><br></br>
                                {
                                    itemsRequested.map((itemRequested, index) => (
                                        <div key={index}>
                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                    className="form-control"
                                                    name="itemName"
                                                    id="floatingInput"
                                                    placeholder="Item Name"
                                                    style={{ color: "#8CA6FE" }}
                                                    value={itemRequested.itemName}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    required />
                                                <label for="floatingInput">Item Name</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                    className="form-control"
                                                    id="floatingInput"
                                                    name="itemQuantity"
                                                    placeholder="Item Quantity"
                                                    style={{ color: "#8CA6FE" }}
                                                    value={itemRequested.itemQuantity}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    required />
                                                <label for="floatingInput">Item Quantity</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                    className="form-control"
                                                    id="floatingInput"
                                                    placeholder="mUnits"
                                                    name="mUnits"
                                                    style={{ color: "#8CA6FE" }}
                                                    value={itemRequested.mUnits}
                                                    onChange={event => handleChangeInput(index, event)}
                                                    required />
                                                <label for="floatingInput">measurement Units</label>
                                            </div>

                                            <FontAwesomeIcon onClick={addNewInput} icon={faPlusCircle} style={{ color: 'green', fontSize: '28px' }} />
                                            <FontAwesomeIcon onClick={() => removeInput(index)} icon={faMinusCircle} style={{ color: 'red', fontSize: '28px', marginLeft: '2px' }} />
                                        </div>
                                    ))
                                }
                                <div className="mb-3" style={{ textAlign: 'center' }}>
                                    <button style={{ width: "50%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }} onClick={saveDataHandler}>SUBMIT REQUEST</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Col>
                <Col sm='12' md='2' lg='2' xl='2'>
                    <Navbar />
                </Col>
            </Row>
        </div>
    )
}

export default RequestRawMaterialsForm