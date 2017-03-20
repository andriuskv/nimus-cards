import React from "react";
import CardSide from "./study-card-side";
import StudySetHeader from "./study-set-header";

export default function StudySet({ card, cardCount, score, mode, revealBack, getNextCard, getSideElement }) {
    function renderFooterBtns() {
        return (
            <div>
                <button className="btn btn-danger study-footer-btn" onClick={() => getNextCard(0)}>I Was Wrong</button>
                <button className="btn btn-success" onClick={() => getNextCard(1)}>I Got It Right</button>
            </div>
        );
    }

    return (
        <div className="study-container">
            <StudySetHeader score={score} mode={mode} />
            <div className="study-card">
                <CardSide side="front" content={card.front} getSideElement={getSideElement} />
                <CardSide side="back" content={card.back} getSideElement={getSideElement} revealBack={revealBack}/>
            </div>
            <div className="container-footer study-footer">
                <span className="study-progress">Progress: {card.index + 1}/{cardCount}</span>
                {card.back && renderFooterBtns()}
            </div>
        </div>
    );
}
