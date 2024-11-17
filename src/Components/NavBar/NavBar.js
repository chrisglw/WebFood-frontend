import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ cartItems }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userRole] = useState("manager"); // Change to "manager" or "employee" to test
    const menuRef = useRef(null); // Reference to the menu element

    // Calculate the cart item count dynamically
    const cartItemCount = cartItems.length;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/menu" onClick={closeMenu}>Menu</Link></li>
                <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>

                {/* Conditional Links for Managers */}
                {userRole === "manager" && (
                    <>
                        <li><Link to="/manage-menu" onClick={closeMenu}>Manage Menu</Link></li>
                        <li><Link to="/manage-orders" onClick={closeMenu}>Manage Orders</Link></li>
                    </>
                )}

                {/* Conditional Link for Employees */}
                {userRole === "employee" && (
                    <li><Link to="/manage-orders" onClick={closeMenu}>Manage Orders</Link></li>
                )}
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
