import React from "react";
import CardFront from "./study-card-front";
import CardBack from "./study-card-back";

function getTextStyles(cardSide) {
    if (cardSide.textSize) {
        return {
            fontSize: `${cardSide.textSize}px`
        };
    }
}

export default function StudyCard({ card, revealBack, flipSide }) {
    return (
        <div className="study-card" onClick={flipSide}>
            <CardFront card={card} textStyles={getTextStyles(card.front)} />
            <CardBack card={card} textStyles={getTextStyles(card.back)} revealBack={revealBack} />
            {card.isBackSideRevealed && <div className="study-card-hint">CLICK TO FLIP</div>}
        </div>
    );
}
