import React, { useState } from 'react';
import './Menu.css';

function Menu() {
    const [cart, setCart] = useState([]);

    const menuItems = [
        { category: 'Appetizers', items: ['Bruschetta', 'Caprese Salad', 'Garlic Bread'] },
        { category: 'Pasta', items: ['Spaghetti Carbonara', 'Fettuccine Alfredo', 'Penne Arrabbiata'] },
        { category: 'Pizza', items: ['Margherita', 'Quattro Stagioni', 'Pepperoni'] },
        { category: 'Dessert', items: ['Tiramisu', 'Panna Cotta', 'Cannoli'] }
    ];

    const addToCart = (item) => {
        setCart([...cart, item]);
        alert(`${item} added to cart!`);
    };

    return (
        <div className="menu-container">
            <h1 className="menu-title">Menu</h1>
            <p className="menu-subtitle">Check out our delicious menu!</p>
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
