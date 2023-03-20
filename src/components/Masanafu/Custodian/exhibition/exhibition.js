import { Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../../Namungoona/supervisor dashboard/namungoona.css'
import Navbar from "../../../side navbar/sidenav";
import { useState,  useEffect } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Exhibitionmanagement = () => {
    const [status, setStatus] = useState()
    const [itemsRequested, setItemsRequested] = useState([{ itemName: '', itemQuantity: '', mUnits: '' },])
    const [itemList, setitemList] = useState()
    const [isItemListLoading, setisItemListLoading] = useState(true)

    const removeInput = (index) => {
        const values = [...itemsRequested];
        values.splice(index, 1);
        setItemsRequested(values)
    }
    const addNewInput = () => {
        setItemsRequested([...itemsRequested, { itemName: '', itemQuantity: '', mUnits: '' }])
    }

    const handleChangeInput = (index, event) => {
        let values = [...itemsRequested];
        values[index][event.target.name] = event.target.value;
        setItemsRequested(values)
    }

    const fetchItems = async () => {
        const res = await axios.post('http://82.180.136.230:3005/itemlist', {
            token: localStorage.getItem("token")
        })
        setitemList(res.data)
        setisItemListLoading(false)
    }

    useEffect(() => {
        fetchItems()
        const interval = setInterval(() => {
            fetchItems()
        }, 5000)


        return () => clearInterval(interval)
    }, [])


    const submitDataHandler = async event => {
        event.preventDefault()
        // let res = await axios.post('http://82.180.136.230:3005/placeorder', {
        //     orderId: orderId,
        //     sourcebranch: localStorage.getItem('branch'),
        //     orderedbydepartment: localStorage.getItem('department'),
        //     orderedbyrole: localStorage.getItem('role'),
        //     orderedby: localStorage.getItem('username'),
        //     destinationbranch: branchRef.current.value,
        //     recieverdepartment: deptRef.current.value,
        //     recieverrole: roleRef.current.value,
        //     deliveredto: recievedBy,
        //     itemsrequested: JSON.stringify(itemsRequested),
        //     token: localStorage.getItem("token")
        // }).then(() => setStatus({ type: 'success' }))
        //     .catch((err) => setStatus({ type: 'error', err }))
    }
    return (
        <div className='container-fluid'>
        <Row>
            <Col sm='2' md='2' lg='2' xl='2'></Col>
            <Col sm='12' md='8' lg='8' xl='8'>
                <div className="container  d-flex align-items-center" style={{ marginTop: '50px' }}>

                    <Form>
                        <h2 style={{ marginTop: '10px', fontSize: '50px', textAlign: 'center' }}>Exhibition Management</h2>
                        {status?.type === 'success' && <span style={{ margin: '20px' }} class="alert alert-success" role="alert">Order Successfully Placed</span>}
                        {status?.type === 'error' && <span style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error! Transaction was not saved</span>}
                        <div style={{ marginTop: '20px' }}>
                            <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Exhibition Data</h3>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="Exhibition Name" style={{ color: "#8CA6FE" }} required />
                                <label for="floatingInput">Exhibition Name</label>
                            </div><br></br>
                            <div className="form-floating mb-3">
                                <input type='date' className="form-control" id="floatingInput" placeholder="Exhibition Date" style={{ color: "#8CA6FE" }} required />
                                <label for="floatingInput">Exhibition Date</label>
                            </div><br></br>
                            <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Items To Be Taken</h3>
                            <table className="table" style={{ marginTop: '10px' }}>
                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Quantity In Stock</th>
                                        <th scope="col">Quantity Taken</th>
                                        <th scope="col">Unit Of Measurement</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {itemsRequested.map((itemRequested, index) => (

                                        <tr key={index}>
                                            <td>
                                                <div className="form-floating mb-3">
                                                    <select class="form-select"
                                                        name="itemName"
                                                        aria-label="Default select example"
                                                        placeholder="Item Name"
                                                        onChange={event => handleChangeInput(index, event)}
                                                        value={itemRequested.itemName}
                                                        required>
                                                        <option selected>Filter By Item Name</option>
                                                        {isItemListLoading ? <option>Loading Items From Database</option> :
                                                            itemList.map(item => (
                                                                <option>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            </td>
                                             <td>
                                                                56
                                            </td>                       

                                            <td>
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
                                            </td>

                                            <td>

                                                <div className="form-floating mb-3">
                                                    <select
                                                        class="form-select"
                                                        aria-label="Default select example"
                                                        style={{ height: "60px", color: "#8CA6FE" }}
                                                        placeholder="mUnits"
                                                        name="mUnits"
                                                        value={itemRequested.mUnits}
                                                        onChange={event => handleChangeInput(index, event)}
                                                        required>

                                                        <option selected>Measurement</option>
                                                        <option value="L">Litres</option>
                                                        <option value="KG">Kilograms</option>
                                                        <option value="MLS">Milliliters</option>
                                                        <option value="Pcs">Pcs</option>
                                                        <option disabled>---grams packaging sizes---</option>
                                                        <option value="10grampcs">10 grams Pcs</option>
                                                        <option value="20grampcs">20 grams Pcs</option>
                                                        <option value="50grampcs">50 grams Pcs</option>
                                                        <option value="100grampcs">100 grams Pcs</option>
                                                        <option value="250grampcs">250 grams Pcs</option>
                                                        <option value="350grampcs">350 grams Pcs</option>
                                                        <option value="400grampcs">400 grams Pcs</option>
                                                        <option value="450grampcs">450 grams Pcs</option>
                                                        <option value="500grampcs">500 grams Pcs</option>
                                                        <option value="700grampcs">700 grams Pcs</option>
                                                        <option value="750grampcs">750 grams Pcs</option>
                                                        <option disabled>---mls packaging sizes---</option>
                                                        <option value="10mlpcs">10 mls Pcs</option>
                                                        <option value="20mlpcs">20 mls Pcs</option>
                                                        <option value="50mlpcs">50 mls Pcs</option>
                                                        <option value="100mlpcs">100 mls Pcs</option>
                                                        <option value="250mlpcs">250 mls Pcs</option>
                                                        <option value="350mlpcs">350 mls Pcs</option>
                                                        <option value="500mlpcs">500 mls Pcs</option>
                                                        <option value="550mlpcs">550 mls Pcs</option>
                                                        <option value="600mlpcs">600 mls Pcs</option>
                                                        <option value="650mlpcs">650 mls Pcs</option>
                                                        <option value="700mlpcs">700 mls Pcs</option>
                                                        <option value="750mlpcs">750 mls Pcs</option>
                                                    </select>
                                                </div>
                                            </td>

                                            <td>
                                                <FontAwesomeIcon onClick={addNewInput} icon={faPlusCircle} style={{ color: 'green', fontSize: '30px', cursor: 'pointer' }} />
                                                <FontAwesomeIcon onClick={() => removeInput(index)} icon={faMinusCircle} style={{ color: 'red', fontSize: '30px', marginLeft: '2px', cursor: 'pointer' }} />
                                            </td>

                                        </tr>

                                    ))
                                    }
                                </tbody>
                            </table>
                            <h3 style={{ marginTop: '10px', fontSize: '30px', textAlign: 'center' }}>Official's Data</h3>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('branch')} required readOnly />
                                <label for="floatingInput">Order From ( Branch )</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('department')} required readOnly />
                                <label for="floatingInput">Ordered By ( Department )</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('role')} required readOnly />
                                <label for="floatingInput">Ordered By ( Role )</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="Order-Id" style={{ color: "#8CA6FE" }} value={localStorage.getItem('username')} required readOnly />
                                <label for="floatingInput">Ordered By ( username )</label>
                            </div>
                            <div className="mb-3" style={{ textAlign: 'center' }}>
                                <button style={{ width: "50%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }} onClick={submitDataHandler}>SAVE DATA</button>
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
    );
}
export default Exhibitionmanagement