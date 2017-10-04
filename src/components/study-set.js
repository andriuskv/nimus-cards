import React from "react";
import Container from "./container";
import StudySetHeader from "./study-set-header";
import Card from "../components/study-card";
import Timeout from "../containers/timeout";

export default function StudySet({ title, card, cardCount, score, mode, timeoutDuration, revealBack, flipSide, getNextCard }) {
    return (
        <Container title={title}>
            <div className="container study-container">
                <StudySetHeader score={score} mode={mode} />
                <Card card={card} revealBack={revealBack} flipSide={flipSide} />
            </div>
            <div className="container container-footer study-footer">
                <span className="study-progress">Progress: {card.index + 1}/{cardCount}</span>
                {!card.isBackSideRevealed &&
                    <Timeout duration={timeoutDuration} callback={revealBack} />}
                {card.isBackSideRevealed ? (
                    <div>
                        <button className="btn btn-danger study-footer-btn"
                            onClick={() => getNextCard(0)}>I Was Wrong</button>
                        <button className="btn btn-success study-footer-btn"
                            onClick={() => getNextCard(1)}>I Got It Right</button>
                    </div>) :
                    <button className="btn" onClick={revealBack}>Reveal</button>}
            </div>
        </Container>
    );
}
