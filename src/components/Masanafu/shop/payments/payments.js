import { useState } from "react";
import airtelLogo from '../../../../imgs/airtel.png'

const PaymentModule = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
  
    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };
  
    const handleLastNameChange = (event) => {
      setLastName(event.target.value);
    };
  
    const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
    };
  
    const handlePaymentMethodChange = (event) => {
      setPaymentMethod(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic
    };
  
    return(
        <>
            <h3 style={{textAlign:'center'}}>Customer Details</h3>
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
                <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethodCard"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="paymentMethodCard">
                    <img src="https://www.kindpng.com/picc/m/168-1686581_online-data-entry-job-plans-giving-cash-icon.png" alt="Online Data Entry Job Plans - Giving Cash Icon Png, Transparent Png@kindpng.com" style={{height:'50px'}}/> Cash
                    </label>
                </div>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethodPaypal"
                    value="airtelmoney"
                    checked={paymentMethod === 'airtelmoney'}
                    onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="paymentMethodPaypal">
                    <img src={airtelLogo} alt="Airtel Money" style={{height:'50px'}}/> Airtel Money
                    </label>
                </div>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethodPaypal"
                    value="mtnmomo"
                    checked={paymentMethod === 'mtnmomo'}
                    onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="paymentMethodPaypal">
                    <img src="https://www.kindpng.com/picc/m/151-1514348_mtn-momo-logo-mobile-money-logo-png-transparent.png" alt="Mtn Momo Logo - Mobile Money Logo Png, Transparent Png@kindpng.com" style={{height:'50px'}}/> MTN MoMo
                    </label>
                </div>
                
                </div>
                <button type="submit" style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3", marginTop: '10px' }}>
                    Checkout
                </button>
            </form>
       </> 
    )
}

export default PaymentModule