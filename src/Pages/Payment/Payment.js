import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleProcessOrder = () => {
        // Simulate sending an email confirmation
        alert(`Order confirmed! An email will be sent to ${email}.`);
        // Redirect to the home page
        navigate('/');
    };

    return (
        <div className="payment-page-container">
            <h1 className="payment-page-title">Payment Information</h1>
            <form className="payment-form">
                <div className="form-group">
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="button"
                    className="process-order-button"
                    onClick={handleProcessOrder}
                >
                    Process Order
                </button>
            </form>
        </div>
    );
}

export default Payment;
