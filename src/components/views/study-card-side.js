import React from "react";

export default function CardSide({ side, card, getSideElement, revealBack }) {
    function isVisible(side, backSide) {
        return side === "front" && !backSide || side === "back" && backSide;
    }

    function renderSide(side, content) {
        return side === "front" || content ? (
            <div className="study-side">
                <div className="study-side-content-container" ref={elem => getSideElement(elem, side)}>
                    <p className="study-side-content">{content}</p>
                </div>
            </div>) :
            <button className="btn study-side study-reveal-btn" onClick={revealBack}>Reveal</button>;
    }

    return (
        <div className={`study-side-container${isVisible(side, card.back) ? " visible" : ""}`}>
            <div className="side-name">{side}</div>
            {renderSide(side, card[side])}
        </div>
    );
}
