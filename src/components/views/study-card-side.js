import React from "react";

export default function CardSide({ side, card, revealBack }) {
    function isVisible(side, backSide) {
        return side === "front" && !backSide || side === "back" && backSide;
    }

    return (
        <div className={`side-container${isVisible(side, card.back) ? " visible" : ""}`}>
            <div className="side-name">{side}</div>
            <div className="side">
                {card[side] ? <div className="side-content study-side-content">
                    {card[side].image && (
                        <div className={`side-image-container${card[side].text ? "": " full"}`}>
                            <img src={URL.createObjectURL(card[side].image)} alt="" className="side-image" />
                        </div>
                    )}
                    {card[side].text && (
                        <div className="side-text study-side-text">
                            <div>{card[side].text}</div>
                        </div>
                    )}
                </div> :
                <div className="side-content study-side-content">
                    <button className="btn side-text study-side-text study-reveal-btn" onClick={revealBack}>
                        <div>Reveal</div>
                    </button>
                </div>}
            </div>
        </div>
    );
}
