import React from "react";
import CardFront from "./study-card-front";
import CardBack from "./study-card-back";
import CardNotes from "./study-card-notes";

export default function StudyCard({ card, selectOption, toggleNotes, handleChange }) {
    function renderSides() {
        if (card.back.type === "text") {
            return card.answerRevealed ? <CardBack card={card} /> : <CardFront side={card.front} />;
        }
        return (
            <React.Fragment>
                <CardFront side={card.front} />
                <CardBack card={card} selectOption={selectOption} handleChange={handleChange}/>
            </React.Fragment>
        );
    }

    return (
        <div className={`study-card ${card.back.type === "text" ? "one" : "two"}`}>
            {renderSides()}
            <CardNotes notes={card.notes} toggleNotes={toggleNotes} />
        </div>
    );
}
