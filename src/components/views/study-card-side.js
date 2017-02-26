import React from "react";

export default function CardSide({ children, side, content, getSideElement }) {
    function getSide(side, content) {
        return (
            <div className="study-side" ref={(elem) => getSideElement(elem, side)}>
                <p className="study-side-content">{content}</p>
            </div>
        );
    }

    return (
        <div className="study-side-container">
            <div className="side-name">{side}</div>
            {children ? children : getSide(side, content)}
        </div>
    );
}
