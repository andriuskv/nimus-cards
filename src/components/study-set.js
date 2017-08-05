import React from "react";
import Container from "./container";
import CardSide from "./study-card-side";
import StudySetHeader from "./study-set-header";
import Timeout from "../containers/timeout";

export default function StudySet({ title, card, cardCount, score, mode, timeoutDuration, revealBack, getNextCard, getSideElement }) {
    function renderTimeoutComponent() {
        if (!timeoutDuration || card.back) {
            return null;
        }
        return <Timeout duration={timeoutDuration} callback={revealBack} />;
    }

    function renderFooterBtns() {
        return card.back ? (
            <div>
                <button className="btn btn-danger study-footer-btn"
                    onClick={() => getNextCard(0)}>I Was Wrong</button>
                <button className="btn btn-success study-footer-btn"
                    onClick={() => getNextCard(1)}>I Got It Right</button>
            </div>) :
            <button className="btn" onClick={revealBack}>Reveal</button>;
    }

    return (
        <Container title={title}>
            <div className="container study-container">
                <StudySetHeader score={score} mode={mode} />
                <div className="study-card">
                    <CardSide side="front" card={card} getSideElement={getSideElement} />
                    <CardSide side="back" card={card} getSideElement={getSideElement} revealBack={revealBack} />
                </div>
            </div>
            <div className="container container-footer study-footer">
                <span className="study-progress">Progress: {card.index + 1}/{cardCount}</span>
                {renderTimeoutComponent()}
                {renderFooterBtns()}
            </div>
        </Container>
    );
}
