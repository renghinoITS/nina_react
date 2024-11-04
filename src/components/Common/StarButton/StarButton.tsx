import "./StarButton.css";

import React, { ButtonHTMLAttributes } from "react";

interface StarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonText: string;
    isLoading?: boolean;
}

const StarButton: React.FC<StarButtonProps> = ({ buttonText, isLoading, ...props }) => {
    return (
        <button className="star-button" {...props} disabled={isLoading}>
            <strong>{buttonText}</strong>
            <div className="star-button-container">
                <div className="stars"></div>
            </div>
            <div className="glow">
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </button>
    );
};

export default StarButton;
