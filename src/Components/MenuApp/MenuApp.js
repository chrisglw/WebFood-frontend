// MenuApp.js
import React, { useState } from 'react';
import Menu from '../../Pages/Menu/Menu';
import Cart from '../../Pages/Cart/Cart';
// import './MenuApp.css';

function MenuApp() {
    const [cartItems, setCartItems] = useState([]);

    return (
        <div className="menu-app-container">
            <Menu cartItems={cartItems} setCartItems={setCartItems} />
            <Cart cartItems={cartItems} setCartItems={setCartItems} />
        </div>
    );
}

export default MenuApp;
