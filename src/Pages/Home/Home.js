import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="hero-image"></div>
            <div className="content-below-hero">
                <h2>Dine-in 11-3pm. Pick-Up & Delivery until 9:30 p.m.</h2>
                <h3>
                    Explore our <Link to="/menu" className="menu-link">Menu,</Link> then order by phone or place your order online through{' '}
                    <a href="https://www.grubhub.com" className="grubhub-link">GRUBHUB</a>.
                </h3>
                <Link to="/menu">
                    <button className="menu-button">Menu</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
