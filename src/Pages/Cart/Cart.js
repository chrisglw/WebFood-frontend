// Cart.js
import React from 'react';
import './Cart.css';

function Cart({ cartItems, setCartItems }) {
    const removeFromCart = (item) => {
        const updatedCart = cartItems.filter(cartItem => cartItem !== item);
        setCartItems(updatedCart);
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="cart-empty">Your cart is currently empty.</p>
            ) : (
                <ul className="cart-list">
                    {cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            {item}
                            <button className="remove-from-cart-button" onClick={() => removeFromCart(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;
