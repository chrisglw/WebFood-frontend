import React, { useState } from 'react';
import './Menu.css';

function Menu({ cartItems, setCartItems }) {
    const [notification, setNotification] = useState('');

    const menuItems = [
        {
            category: 'Appetizers', items: [
                { name: 'Bruschetta', price: 5.99 },
                { name: 'Caprese Salad', price: 6.99 },
                { name: 'Garlic Bread', price: 4.99 }
            ]
        },
        {
            category: 'Pasta', items: [
                { name: 'Spaghetti Carbonara', price: 10.99 },
                { name: 'Fettuccine Alfredo', price: 11.99 },
                { name: 'Penne Arrabbiata', price: 9.99 }
            ]
        },
        {
            category: 'Pizza', items: [
                { name: 'Margherita', price: 8.99 },
                { name: 'Quattro Stagioni', price: 12.99 },
                { name: 'Pepperoni', price: 10.99 }
            ]
        },
        {
            category: 'Dessert', items: [
                { name: 'Tiramisu', price: 6.99 },
                { name: 'Panna Cotta', price: 5.99 },
                { name: 'Cannoli', price: 4.99 }
            ]
        }
    ];

    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (item, quantity) => {
        setQuantities({ ...quantities, [item]: quantity });
    };

    const addToCart = (item) => {
        const quantity = quantities[item.name] || 1; // Default to 1 if no quantity selected
        setCartItems([...cartItems, { ...item, quantity }]);
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

            {menuItems.map((section, index) => (
                <div key={index} className="menu-section">
                    <h2 className="menu-category">{section.category}</h2>
                    <ul className="menu-list">
                        {section.items.map((item, idx) => (
                            <li key={idx} className="menu-item">
                                <span className="menu-item-name">{item.name} - ${item.price.toFixed(2)}</span>
                                <div className="menu-item-actions">
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantities[item.name] || 1}
                                        onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value))}
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
            ))}
        </div>
    );
}

export default Menu;
