import React, { useState } from 'react';
import './Menu.css';

function Menu({ cartItems, setCartItems, menuItems }) { // Add menuItems as a prop
    const [notification, setNotification] = useState('');
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (itemName, quantity) => {
        setQuantities({ ...quantities, [itemName]: quantity });
    };

    const addToCart = (item) => {
        const quantity = quantities[item.name] || 1;
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

        if (existingItem) {
            const updatedCart = cartItems.map(cartItem =>
                cartItem.name === item.name
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            );
            setCartItems(updatedCart);
        } else {
            // Add new item to the cart
            setCartItems([...cartItems, { ...item, quantity }]);
        }

        showNotification(`${item.name} (x${quantity}) added to cart!`);
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    return (
        <div className="menu-container">
            <h1 className="menu-title">Menu</h1>
            <p className="menu-subtitle">Check out our delicious menu!</p>

            {notification && <div className="notification">{notification}</div>}

            {menuItems.length === 0 ? (
                <p className="no-items-message">No items in the menu. Please add items from Manage Menu.</p>
            ) : (
                menuItems.map((section, index) => (
                    <div key={index} className="menu-section">
                        <h2 className="menu-category">{section.category}</h2>
                        <ul className="menu-list">
                            {section.items.map((item, idx) => (
                                <li key={idx} className="menu-item">
                                    <span className="menu-item-name">
                                        {item.name} - ${item.price.toFixed(2)}
                                    </span>
                                    <div className="menu-item-actions">
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantities[item.name] || 1}
                                            onChange={(e) =>
                                                handleQuantityChange(item.name, parseInt(e.target.value))
                                            }
                                            className="quantity-input"
                                        />
                                        <button className="add-to-cart-button" onClick={() => addToCart(item)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}

export default Menu;
