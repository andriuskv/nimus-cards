import React from "react";

export default function CardSide({ side, card, revealBack }) {
    function isVisible(side, backSide) {
        return side === "front" && !backSide || side === "back" && backSide;
    }

    function setContent(element, content) {
        if (element) {
            element.innerHTML = content;
        }
    }

    return (
        <div className={`study-side${isVisible(side, card.back) ? " visible" : ""}`}>
            <div className="side-name">{side}</div>
            {side === "front" || card[side] ? (
                <div className="study-side-content-container">
                    <div className="study-side-content" ref={(ref) => setContent(ref, card[side])}></div>
                </div>) :
                <button className="btn study-side-content-container study-reveal-btn" onClick={revealBack}>Reveal</button>}
        </div>
    );
}
