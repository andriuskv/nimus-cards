import React from "react";
import Icon from "../components/icon";
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
        <div className="study-card">
            {card.isBackSideRevealed && (
                <button className="btn-icon side-flip-btn study-side-flip-btn"
                    title="Flip side"
                    onClick={flipSide}>
                    <Icon name="flip" />
                </button>
            )}
            <CardFront card={card}
                visibleSide={card.visibleSide}
                textStyles={getTextStyles(card.front)} />
            <CardBack card={card}
                visibleSide={card.visibleSide}
                textStyles={getTextStyles(card.back)}
                revealBack={revealBack} />
        </div>
    );
}
