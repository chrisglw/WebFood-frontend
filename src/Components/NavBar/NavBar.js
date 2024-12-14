import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ cartItems, userRole, setUserRole }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const cartItemCount = cartItems.length;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle logout functionality
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        setUserRole(null); // Reset the user role in state
        alert('You have been logged out.');
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
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/menu" onClick={closeMenu}>Menu</Link></li>

                {/* Conditional Links for Managers */}
                {userRole === "manager" && (
                    <>
                        <li><Link to="/manage-menu" onClick={closeMenu}>Manage Menu</Link></li>
                        <li><Link to="/manage-orders" onClick={closeMenu}>Manage Orders</Link></li>
                        <li><Link to="/sales-report" onClick={closeMenu}>Sales Report</Link></li>
                    </>
                )}

                {/* Conditional Link for Employees */}
                {userRole === "staff" && (
                    <li><Link to="/manage-orders" onClick={closeMenu}>Manage Orders</Link></li>
                )}

                {/* Show login option if not logged in */}
                {!userRole && (
                    <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                )}

                {/* Show logout option if logged in */}
                {userRole && (
                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
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
