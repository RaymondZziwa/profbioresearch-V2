import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './receipt.css';
import ReactToPrint from "react-to-print";
import Logo from '../../../../imgs/logo.png'

class PrintableContent extends React.Component {
    render() {
      const { firstName, lastName, cart, clientcontact, total,balance, amountPaid, receiptNumber} = this.props;
      return (
        <div style={{color:'black',padding:'20px'}}>
          <h1> <img src={Logo} alt="receipt-logo" style={{margin:'auto'}}  height='80px'/>Prof-bioresearch {localStorage.getItem('branch')} shop receipt</h1>
          <p>Receipt Number: {receiptNumber}</p>
          <p>Client First Name: {firstName}</p>
          <p>Client Last Name: {lastName}</p>
          <p>Client Contact: {clientcontact}</p>
          <p>Items Total Amount: UGX: {total}</p>
          <p>Items Amount Paid: UGX: {amountPaid}</p>
          <p>Balance: UGX: {balance}</p>
          <table className="table table-light">
                <thead>
                    <tr>
                    <th>Item Name</th>
                    <th>Unit Cost (UGX)</th>
                    <th>Discount (%)</th>
                    <th>Total Quantity</th>
                    <th>Total Cost (UGX)</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.length === 0 ? (
                    <tr>
                        <td colSpan="8" style={{ textAlign: "center" }}>
                        There are no items in the cart.
                        </td>
                    </tr>
                    ) : (
                    cart.map((item) => (
                        <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.unitCost}</td>
                        <td>{item.discount}</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalCost}</td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
          <p>Served By: {localStorage.getItem('username')}</p>
          <p style={{ position: 'absolute', bottom: '10px', fontSize: '12px', borderTop:'1px solid black', textAlign:'center' }}>
            Receipt Printed By Prof-Bioresearch POS System.
          </p>
        </div>
      );
    }
  }





  
const PaymentModule = ({ items, total }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [amount, setAmountPaid] = useState(0)
    const  [balance, setBalance] = useState(0)
    const [status, setStatus] = useState('')
    const [isPrinting, setIsPrinting] = useState(false);
    const [receiptNo, setReceiptNo] = useState(0)

    const componentRef = useRef();

    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };
  
    const handleLastNameChange = (event) => {
      setLastName(event.target.value);
    };
  
    const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
    };
  
    const handlePaymentStatusChange = (event) => {
        setPaymentStatus(event.target.value);
    };

    const additionalInfoInput = event => {
        event.preventDefault()
        setAdditionalInfo(event.target.value)
    }

    const amountInput = event => {
        event.preventDefault()
        setAmountPaid(event.target.value)
    }
    
    const paymentMethodHandler = event => {
        event.preventDefault()
        setPaymentMethod(event.target.value)
    }

    useEffect(()=>{
        setReceiptNo(Math.floor(Math.random() * 1800000))
        if(paymentStatus === 'fullypaid'){
            setBalance(0)
        }else if(paymentStatus === 'partiallypaid'){
            setBalance(total - amount)
        }else{
            setBalance(total)
        }
    }, [paymentStatus, amount])

    const handleSubmit = async (event) => {
      event.preventDefault();
      let res = await axios.post('http://82.180.136.230:3005/cartcheckout',{
        token: localStorage.getItem('token'),
        branch: localStorage.getItem('branch'),
        items: JSON.stringify(items),
        receiptNo: receiptNo,
        total: total,
        additionalInfo: additionalInfo,
        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
        balance: balance,
        customerNames: `${firstName} ${lastName}`,
        customerContact: phoneNumber,
        date: new Date().toLocaleDateString()
      })
    .then(() => 
    setStatus({ type: 'success' }),
    componentRef.current && componentRef.current.handlePrint(),
    console.log(res.data)
    )

    .catch((err) => setStatus({ type: 'error', err }))
      console.log(firstName, lastName, phoneNumber, paymentMethod, amount, additionalInfo, items, total)
    };
  
    return(
        <>  
            <h3 style={{textAlign:'center'}}>Customer Details</h3>
            {status?.type === 'success' && <p style={{ margin: '20px' }} class="alert alert-success" role="alert">Success</p>}
            {status?.type === 'error' && <p style={{ margin: '20px' }} class="alert alert-danger" role="alert">Error!</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                    First Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                />
                </div>
                <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                    Last Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                />
                </div>
                <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                </label>
                <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                />
                </div>
                <select class="form-select" aria-label="Default select example" style={{ height: "60px", color: "#8CA6FE" }} onChange={paymentMethodHandler} required>
                    <option selected>Payment Method</option>
                    <option value='Cash'>Cash</option>    
                    <option value='Airtel Money'>Airtel Money</option>
                    <option value='MTN MoMo'>MTN MoMo</option>
                    <option value='Prof MM'>Prof Mobile Money</option>      
                </select>
                <div className="mb-3">
                <label className="form-label">Payment Status</label>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethodCard"
                    value="fullypaid"
                    checked={paymentStatus === 'fullypaid'}
                    onChange={handlePaymentStatusChange}
                    />
                    <label className="form-check-label" htmlFor="paymentMethodCard">
                    Fully Paid
                    </label>
                </div>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="paymentStatus"
                    id="paymentMethodPaypal"
                    value="partiallypaid"
                    checked={paymentStatus === 'partiallypaid'}
                    onChange={handlePaymentStatusChange}
                    />
                    <label className="form-check-label" htmlFor="paymentMethodPaypal">
                    Partially Paid
                    </label>
                </div>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethodPaypal"
                    value="unpaid"
                    checked={paymentStatus === 'unpaid'}
                    onChange={handlePaymentStatusChange}
                    />
                    <label className="form-check-label" htmlFor="paymentMethodPaypal">
                    Unpaid
                    </label>
                </div>
                { paymentStatus === 'partiallypaid' && 
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE" }} onChange={amountInput} min='0' />
                            <label for="floatingInput">Amount Paid</label>
                        </div>
                    </div>
                }
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                            <textarea type="text" className="form-control" rows="6" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE", height: '130px', width: '300px' }} onChange={additionalInfoInput} />
                            <label for="floatingInput">Notes</label>
                        </div>
                    </div>
                               
                </div>
                <ReactToPrint
                    trigger={() => (
                        <button type="submit" style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3"}}>
                            Checkout
                        </button>
                    )}
                    content={() => componentRef.current}
                    pdfPrint={true}
                />
                <div className="print-content">
                    <PrintableContent ref={componentRef} firstName={firstName} lastName={lastName} cart={items} clientcontact={phoneNumber} total={total} balance={balance} amountPaid={total-balance} receiptNumber={receiptNo}/>
                </div>
                <style>
                    {`
                    .print-content {
                        display: none;
                    }
                    `}
                </style>
            </form>
       </> 
    )
}

export default PaymentModule