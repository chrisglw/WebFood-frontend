import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment({ cartItems, setCartItems, orders, setOrders }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTax = (subtotal) => {
        return subtotal * 0.06; // 6% tax
    };

    const calculateTotal = (subtotal, tax) => {
        return subtotal + tax;
    };

    const handleProcessOrder = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const subtotal = calculateSubtotal();
        const tax = calculateTax(subtotal);
        const total = calculateTotal(subtotal, tax);

        const order = {
            id: Date.now(), // Unique order ID
            customerName: `${firstName} ${lastName}`,
            email,
            items: [...cartItems],
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2),
            status: 'Pending',
        };

        setOrders([...orders, order]); // Add the order to the orders list
        setCartItems([]); // Clear the cart
        alert(`Order confirmed! An email will be sent to ${email}.`);
        navigate('/'); // Redirect to home page
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
