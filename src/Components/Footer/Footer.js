import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <p>
                    <a href="tel:+12084568765" className="footer-link">Phone: (208) 456-8765</a>
                </p>
                <p>
                    <a
                        href="https://www.google.com/maps?q=123+N+2nd+St,+Rexburg,+ID+83440"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        123 N 2nd St, Rexburg, ID 83440
                    </a>
                </p>
                <p>&copy; 2024 WebFood. All rights reserved.</p>
            </div>
            <div className="footer-section social-media">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    <img
                        src={require('../../assets/images/Facebook_Logo_Primary.png')}
                        alt="Facebook"
                        className="social-icon"
                    />

                </a>
            </div>
        </footer>
    );
};

export default Footer;
