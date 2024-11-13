import React, { useState } from 'react';
import './Menu.css';

function Menu({ cartItems, setCartItems }) {
    const [notification, setNotification] = useState('');

    const menuItems = [
        { category: 'Appetizers', items: ['Bruschetta', 'Caprese Salad', 'Garlic Bread'] },
        { category: 'Pasta', items: ['Spaghetti Carbonara', 'Fettuccine Alfredo', 'Penne Arrabbiata'] },
        { category: 'Pizza', items: ['Margherita', 'Quattro Stagioni', 'Pepperoni'] },
        { category: 'Dessert', items: ['Tiramisu', 'Panna Cotta', 'Cannoli'] }
    ];

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
        showNotification(`${item} added to cart!`);
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
        }, 3000); // Notification will disappear after 3 seconds
    };

    return (
        <div className="menu-container">
            <h1 className="menu-title">Menu</h1>
            <p className="menu-subtitle">Check out our delicious menu!</p>
            
            {/* Notification Message */}
            {notification && <div className="notification">{notification}</div>}

            {menuItems.map((section, index) => (
                <div key={index} className="menu-section">
                    <h2 className="menu-category">{section.category}</h2>
                    <ul className="menu-list">
                        {section.items.map((item, idx) => (
                            <li key={idx} className="menu-item">
                                {item}
                                <button className="add-to-cart-button" onClick={() => addToCart(item)}>Add to Cart</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Menu;
