import React from 'react';
import './DisplayContainer.css';

function DisplayContainer({ image, title, description }) {
    return (
        <div className="display-container">
            <img src={image} alt={title} className="display-container-image" />
            <h4 className="display-container-title">{title}</h4>
            <p className="display-container-description">{description}</p>
        </div>
    );
}

export default DisplayContainer;
