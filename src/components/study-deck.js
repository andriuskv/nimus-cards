import React from "react";
import StudyDeckHeader from "./study-deck-header";
import Card from "../components/study-card";
import Timeout from "../containers/timeout";

export default function StudyDeck({ title, card, cardCount, score, mode, timeoutDuration, revealBack, flipSide, getNextCard }) {
    return (
        <React.Fragment>
            <h1 className="study-deck-title">{title}</h1>
            <div className="study-container">
                <StudyDeckHeader score={score} mode={mode} />
                <Card card={card} revealBack={revealBack} flipSide={flipSide} />
            </div>
            <div className="container-footer">
                <span className="study-progress">Progress: {card.index + 1}/{cardCount}</span>
                {!card.isBackSideRevealed &&
                    <Timeout duration={timeoutDuration} callback={revealBack} />
                }
                {card.isBackSideRevealed ?
                    <React.Fragment>
                        <button className="btn-danger study-footer-btn"
                            onClick={() => getNextCard(0)}>I Was Wrong</button>
                        <button className="btn-success study-footer-btn"
                            onClick={() => getNextCard(1)}>I Got It Right</button>
                    </React.Fragment> :
                    <button className="btn" onClick={revealBack}>Reveal</button>
                }
            </div>
        </React.Fragment>
    );
}
