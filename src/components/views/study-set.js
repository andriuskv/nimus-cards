import React from "react";
import Container from "./container";
import CardSide from "./study-card-side";

export default function StudySet({ setTitle, card, cardCount, revealBack, getNextCard, getSideElement }) {
    return (
        <Container title={setTitle}>
            <div className="container">
                <div className="study-card">
                    <CardSide side="front" content={card.front} getSideElement={getSideElement} />
                    <CardSide side="back" content={card.back} getSideElement={getSideElement}>
                        {!card.back && <button className="btn study-reveal-btn" onClick={revealBack}>Reveal</button>}
                    </CardSide>
                </div>
                <div className="study-footer">
                    <span className="study-progress">progress: {card.index + 1}/{cardCount}</span>
                    {card.revealed && <button className="btn" onClick={getNextCard}>Next card</button>}
                </div>
            </div>
        </Container>
    );
}
