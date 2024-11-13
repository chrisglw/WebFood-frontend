import React from 'react';
import { Link } from 'react-router-dom';
import DisplayContainer from '../../Components/DisplayContainer/DisplayContainer';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="hero-image"></div>
            <div className="content-below-hero">
                <h2>Dine-in. Pick-Up & Delivery</h2>
                <h3>
                    Explore our <Link to="/menu" className="menu-link">Menu,</Link> then order by phone or place your order online through{' '}
                    <a href="https://www.grubhub.com" className="grubhub-link">GRUBHUB</a>.
                </h3>
                <Link to="/menu">
                    <button className="menu-button">Menu</button>
                </Link>
            </div>
            <div className="display-containers-wrapper">
                <DisplayContainer
                    image={require('../../assets/images/pasta.png')}
                    title="Pasta"
                    description="Chicken Parm, Shrimp & Crabmeat Alfredo, Creamy Cajun Chicken, Penne Prosciutto"
                />
                <DisplayContainer
                    image={require('../../assets/images/pizza.png')}
                    title="Pizza"
                    description="Authentic, hand-tossed, thin crust pies such as our Traditional, Vodka and Margherita, made with a garlic crust, quality cheeses and house-made marinara."
                />
                <DisplayContainer
                    image={require('../../assets/images/cannoli.png')}
                    title="Desserts"
                    description="We pride ourselves on good service, consistency, and quality."
                />
            </div>
        </div>
    );
}

export default Home;
