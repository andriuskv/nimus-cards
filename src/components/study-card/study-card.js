import React from "react";
import CardFront from "./study-card-front";
import CardBack from "./study-card-back";

export default function StudyCard({ card, selectOption, handleChange }) {
    function renderSides() {
        if (card.back.type === "multi" || card.back.type === "exact") {
            return (
                <React.Fragment>
                    <CardFront side={card.front} />
                    <CardBack card={card} selectOption={selectOption} handleChange={handleChange}/>
                </React.Fragment>
            );
        }
        else if (card.answerRevealed) {
            return <CardBack card={card} />;
        }
        return <CardFront side={card.front} />;
    }
    return <div className={`study-card ${card.back.type}`}>{renderSides()}</div>;
}
