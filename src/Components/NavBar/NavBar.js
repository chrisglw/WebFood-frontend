import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ cartItems }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Calculate the cart item count dynamically
    const cartItemCount = cartItems.length;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="left-section">
                <button className="burger-menu-button" onClick={toggleMenu}>
                    &#9776; {/* Hamburger icon */}
                </button>
                <div className="logo">
                    <h1>Web Food</h1>
                </div>
            </div>
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
            <div className="cart">
                <Link to="/cart">
                    <button className="cart-button">
                        Cart ({cartItemCount})
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
