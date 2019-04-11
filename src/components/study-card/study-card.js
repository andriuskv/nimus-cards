import React from "react";
import CardFront from "./study-card-front";
import CardBack from "./study-card-back";
import Icon from "../icon";

export default function StudyCard({ card, revealAnswer, flipSide, selectOption }) {
    return (
        <div className="study-card">
            {(card.answerRevealed || card.back.type === "multi") && (
                <button className="btn-icon study-card-flip-btn"
                    onClick={flipSide} title="Flip side">
                    <Icon name="flip" />
                </button>
            )}
            <CardFront card={card} />
            <CardBack card={card} revealAnswer={revealAnswer} selectOption={selectOption} />
        </div>
    );
}
