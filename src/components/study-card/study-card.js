import React from "react";
import CardFront from "./study-card-front";
import CardBack from "./study-card-back";
import Icon from "../icon";

export default function StudyCard({ card, revealBack, flipSide }) {
    return (
        <div className="study-card">
            {card.isBackSideRevealed && (
                <button className="btn-icon study-card-flip-btn"
                    onClick={flipSide} title="Flip side">
                    <Icon name="flip" />
                </button>
            )}
            <CardFront card={card} />
            <CardBack card={card} revealBack={revealBack} />
        </div>
    );
}
