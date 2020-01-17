import React from "react";
import CardFront from "./study-card-front";
import CardBack from "./study-card-back";
import CardNotes from "./study-card-notes";

export default function StudyCard({ card, selectOption, handleSubmit, revealAnswer, nextStep }) {
    if (card.back.type === "text" && !card.answerRevealed) {
        return (
            <div className="study-card study-card-text">
                <CardFront side={card.front}/>
                <button className="btn study-card-text-btn study-card-text-reveal-btn"
                    onClick={revealAnswer}>Reveal</button>
                <CardNotes id={card.id} notes={card.notes}/>
            </div>
        );
    }
    return (
        <div className={`study-card study-card-${card.back.type}`}>
            <CardFront id={card.id} side={card.front}/>
            <CardBack card={card} selectOption={selectOption} handleSubmit={handleSubmit}/>
            {card.back.type === "text" && card.answerRevealed && !card.timerReveal && (
                <div className="study-card-text-btns">
                    <button className="btn btn-danger study-card-text-btn" disabled={card.finished}
                        onClick={() => nextStep(false)}>I Was Wrong</button>
                    <button className="btn btn-success study-card-text-btn" disabled={card.finished}
                        onClick={() => nextStep(true)}>I Got It Right</button>
                </div>
            )}
            <CardNotes id={card.id} notes={card.notes}/>
        </div>
    );
}
