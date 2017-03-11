import React from "react";
import CardSide from "./study-card-side";
import StudyScoreBar from "./study-score-bar";

export default function StudySet({ card, cardCount, score, revealBack, getNextCard, getSideElement }) {
    function renderFooterBtns() {
        return (
            <div>
                <button className="btn study-footer-btn" onClick={() => getNextCard(0)}>I Was Wrong</button>
                <button className="btn study-footer-btn" onClick={() => getNextCard(1)}>I Got It Right</button>
            </div>
        );
    }

    return (
        <div>
            <div className="study-header">
                <StudyScoreBar score={score} />
            </div>
            <div className="study-card">
                <CardSide side="front" content={card.front} getSideElement={getSideElement} />
                <CardSide side="back" content={card.back} getSideElement={getSideElement} revealBack={revealBack}/>
            </div>
            <div className="study-footer">
                <span className="study-progress">Progress: {card.index + 1}/{cardCount}</span>
                {card.back && renderFooterBtns()}
            </div>
        </div>
    );
}
