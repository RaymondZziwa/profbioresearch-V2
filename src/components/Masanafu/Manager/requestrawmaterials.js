import { Row, Col, Form } from "react-bootstrap";
import '../../Namungoona/inventory records/forms.css'
import Navbar from "../../side navbar/sidenav";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const RequestRawMaterialsForm = () => {
    const [status, setStatus] = useState({})
    const [itemList, setitemList] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [itemName, setitemName] = useState('')
    const [reason, setreason] = useState('')
    const [orderId, setOrderId] = useState('')
    const [sourceBranch, setsourceBranch] = useState('')
    const [recieversRole, setRecieversRole] = useState('')
    const [itemsRequested, setItemsRequested] = useState([])
    const [destinationBranch, setdestinationBranch] = useState('')
    const [recievedBy, setrecievedBy] = useState('')
    const [quantity, setquantity] = useState('')
    const [actualQuantity, setactualQuantity] = useState('')
    const [damages, setdamages] = useState(0)
    const [mUnit, setmUnit] = useState('')
    const [tCategory, settCategory] = useState('')
    const [outputMUnint, setoutputMUnint] = useState('')
    const expectedOutputRef = useRef()
    const dmgsRef = useRef()

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/itemlist', {
            token: localStorage.getItem("token")
        })
        setitemList(res.data)
        setisLoading(false)
    }

    useEffect(() => {
        fetchItems()
        const interval = setInterval(() => {
            fetchItems()
        }, 2000)


        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (tCategory === 'incoming') {
                setdestinationBranch(localStorage.getItem('branch'))
            } else if (tCategory === 'outgoing') {
                setsourceBranch(localStorage.getItem('branch'))
            }
        }, 1000)


        return () => clearInterval(interval)
    }, [tCategory])

    const categoryInput = event => {
        event.preventDefault()
        settCategory(event.target.value)
    }
    const unitInput = event => {
        event.preventDefault()
        setmUnit(event.target.value)
    }
    const quantityInput = event => {
        event.preventDefault()
        setquantity(event.target.value)
    }
    const actualQuantityInput = event => {
        event.preventDefault()
        setactualQuantity(event.target.value)
    }
    const damagesInput = event => {
        event.preventDefault()
        setdamages(event.target.value)
    }
    const recievedByInput = event => {
        event.preventDefault()
        setrecievedBy(event.target.value)
    }
    const dbranchInput = event => {
        event.preventDefault()
        setdestinationBranch(event.target.value)
    }
    const sourceBranchInput = event => {
        event.preventDefault()
        setsourceBranch(event.target.value)
    }
    const orderIdInput = event => {
        event.preventDefault()
        setOrderId(event.target.value)
    }
    const reasonInput = event => {
        event.preventDefault()
        setreason(event.target.value)
    }
    const itemNameInput = event => {
        event.preventDefault()
        setitemName(event.target.value)
    }
    const outputMUnintInput = event => {
        event.preventDefault()
        setoutputMUnint(event.target.value)
    }
    const calcDamages = () => {
        let dmgs = quantity - actualQuantity;
        dmgsRef.current.value = dmgs.toFixed(3)
    }
    const recieversroleInput = event => {
        event.preventDefault()
        setRecieversRole(event.target.value)
    }

    const saveDataHandler = async event => {
        event.preventDefault()
        calcDamages()
        let str = outputMUnint;
        let matches = str.match(/(\d+)/);
        if (reason === 'manufacturing and packaging') {
            if (mUnit === 'L') {
                const mls = 1000
                let convertedLitres = actualQuantity * mls
                expectedOutputRef.current.value = Math.round(convertedLitres / matches[0])
                let res = await axios.post('http://82.180.136.230:3005/saveinventoryrecord', {
                    orderId: orderId,
                    requesterbranch: localStorage.getItem('branch'),
                    requesterrole: localStorage.getItem('role'),
                    requestedby: localStorage.getItem('username'),
                    requestedfrombranch: sourceBranch,
                    recieversRole: recieversRole,
                    recievedBy: recievedBy,
                    itemsrequested: itemsRequested,
                    token: localStorage.getItem("token")
                }).then(() => setStatus({ type: 'success' }))
                    .catch((err) => setStatus({ type: 'error', err }))
            } else if (mUnit === 'KG') {
                const grams = 1000
                let convertedKgs = actualQuantity * grams
                expectedOutputRef.current.value = Math.round(convertedKgs / matches[0])
                let res = await axios.post('http://82.180.136.230:3005/saveinventoryrecord', {
                    itemname: itemName,
                    reason: reason,
                    orderId: orderId,
                    sourceBranch: sourceBranch,
                    destinationBranch: destinationBranch,
                    recievedBy: recievedBy,
                    quantity: quantity,
                    actualquantity: actualQuantity,
                    damages: dmgsRef.current.value,
                    expectedOutput: `${expectedOutputRef.current.value} ${outputMUnint}`,
                    mstUnit: mUnit,
                    category: tCategory,
                    authorizedBy: localStorage.getItem("username"),
                    token: localStorage.getItem("token")
                }).then(() => setStatus({ type: 'success' }))
                    .catch((err) => setStatus({ type: 'error', err }))
            }
        } else {
            let res = await axios.post('http://82.180.136.230:3005/saveinventoryrecord', {
                itemname: itemName,
                reason: reason,
                orderId: orderId,
                sourceBranch: sourceBranch,
                destinationBranch: destinationBranch,
                recievedBy: recievedBy,
                quantity: quantity,
                actualquantity: actualQuantity,
                damages: dmgsRef.current.value,
                mstUnit: mUnit,
                category: tCategory,
                authorizedBy: localStorage.getItem("username"),
                token: localStorage.getItem("token")
            }).then(() => setStatus({ type: 'success' }))
                .catch((err) => setStatus({ type: 'error', err }))
        }
    }

    return (
        <div className='container-fluid'>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    <Navbar />
                    <div className="container  d-flex align-items-center" style={{ marginTop: '50px' }}>
                        <Form>
                            {status?.type === 'success' && <span style={{ margin: '20px' }} class="alert alert-success" role="alert">Transaction saved</span>}
                            {status?.type === 'error' && <span style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error! Transaction was not saved</span>}
                            <div style={{ marginTop: '20px' }}>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} onChange={orderIdInput} required />
                                    <label for="floatingInput">Order-Id</label>
                                </div>
                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={sourceBranchInput} required>
                                        <option selected>Select Branch To Request From</option>
                                        <option value="masanafu">Masanafu</option>
                                        <option value="equatorial">Equatorial</option>
                                        <option value="buwama">Buwama</option>
                                        <option value="namungoona">Namungoona</option>
                                    </select>
                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={recieversroleInput} required>
                                        <option selected>Reciever's Role</option>
                                        <option value="manager">Manager</option>
                                        <option value="custodian">Custodian</option>
                                    </select>
                                    <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={recievedByInput} required>
                                        <option selected>Rcieved By</option>
                                        <option value="demo">Roger</option>
                                        <option value="demo">Patrick</option>
                                    </select>

                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput" placeholder="Quantity" style={{ color: "#8CA6FE" }} onChange={recievedByInput} required />
                                        <label for="floatingInput">Items To Request</label>
                                    </div>
                                <div className="mb-3" style={{ textAlign: 'center' }}>
                                    <button style={{ width: "50%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }} onClick={saveDataHandler}>SUBMIT REQUEST</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default RequestRawMaterialsForm