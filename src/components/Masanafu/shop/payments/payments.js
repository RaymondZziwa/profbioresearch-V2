import { useState, useEffect } from "react";
import axios from "axios";

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
        total: total,
        additionalInfo: additionalInfo,
        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
        balance: balance,
        customerNames: `${firstName} ${lastName}`,
        customerContact: phoneNumber,
        date: new Date().toLocaleDateString()
      })
      .then(() => setStatus({ type: 'success' }))
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
                    {/* <img src="https://www.kindpng.com/picc/m/168-1686581_online-data-entry-job-plans-giving-cash-icon.png" alt="Online Data Entry Job Plans - Giving Cash Icon Png, Transparent Png@kindpng.com" style={{height:'50px'}}/> Cash */}
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
                    {/* <img src={airtelLogo} alt="Airtel Money" style={{height:'50px'}}/> Airtel Money */}
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
                    {/* <img src="https://www.kindpng.com/picc/m/151-1514348_mtn-momo-logo-mobile-money-logo-png-transparent.png" alt="Mtn Momo Logo - Mobile Money Logo Png, Transparent Png@kindpng.com" style={{height:'50px'}}/> MTN MoMo */}
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
                <button type="submit" style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3"}}>
                    Checkout
                </button>
            </form>
       </> 
    )
}

export default PaymentModule