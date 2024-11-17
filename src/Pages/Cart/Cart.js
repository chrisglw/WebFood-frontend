import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems, setCartItems }) {
    const navigate = useNavigate();

    const removeFromCart = (itemToRemove) => {
        const updatedCart = cartItems.filter(item => item.name !== itemToRemove.name);
        setCartItems(updatedCart);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const calculateTax = () => {
        const subtotal = parseFloat(calculateSubtotal());
        return (subtotal * 0.06).toFixed(2); // 6% tax
    };

    const calculateTotal = () => {
        const subtotal = parseFloat(calculateSubtotal());
        const tax = parseFloat(calculateTax());
        return (subtotal + tax).toFixed(2);
    };

    const handleContinueToPayment = () => {
        navigate('/payment');
    };


    return (
        <div className="cart-container">
            <div className="cart-items-section">
                <h1 className="cart-title">Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p className="cart-empty">Your cart is currently empty.</p>
                ) : (
                    <ul className="cart-list">
                        {cartItems.map((item, index) => (
                            <li key={index} className="cart-item">
                                <div className="cart-item-info">
                                    <span className="cart-item-name">{item.name}</span>
                                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                                </div>
                                <div className="cart-item-quantity">
                                    <span>Quantity: {item.quantity}</span>
                                    <button
                                        className="remove-from-cart-button"
                                        onClick={() => removeFromCart(item)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="order-summary-section">
                <h2 className="order-summary-title">Order Summary</h2>
                <div className="order-summary-details">
                    <div className="order-summary-item">
                        <span>Subtotal</span>
                        <span>${calculateSubtotal()}</span>
                    </div>
                    <div className="order-summary-item">
                        <span>Tax (6%)</span>
                        <span>${calculateTax()}</span>
                    </div>
                    <div className="order-summary-total">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                    </div>
                </div>
                                <button
                    className="continue-to-payment-button"
                    onClick={handleContinueToPayment} // Add onClick event
                >
                    Continue to payment
                </button>

            </div>
        </div>
    );
}

export default Cart;
