import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../api/api';
import './Payment.css';

function Payment({ cartItems, setCartItems, orders, setOrders }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0).toFixed(2);
    };

    const calculateTax = (subtotal) => {
        return (subtotal * 0.06).toFixed(2); // 6% tax
    };

    const calculateTotal = (subtotal, tax) => {
        return (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
    };

    const handleProcessOrder = async () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const subtotal = calculateSubtotal();
        const tax = calculateTax(subtotal);
        const total = calculateTotal(subtotal, tax);

        const orderData = {
            customer_name: `${firstName} ${lastName}`,
            email,
            items: cartItems.map((item) => ({
                menu_item: item.id, // Use the menu item ID
                quantity: item.quantity,
            })),
            status: 'Pending',
        };

        try {
            const newOrder = await createOrder(orderData); // Save the order to the backend
            setOrders([...orders, newOrder]); // Update local state with the new order
            setCartItems([]); // Clear the cart
            alert(`Order confirmed! An email will be sent to ${email}.`);
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Error processing order:', error);
            alert('Failed to process order. Please try again.');
        }
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
