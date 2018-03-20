import React from "react";
import { Link } from "react-router-dom";
import StudyScoreBar from "./study-score-bar";

export default function StudyDeckScore({ title, score, mode, initNextStandardRound, initNextLeitnerLevel }) {
    const { session } = score;

    function renderStandardBtn() {
        return <button className="btn deck-score-btn" onClick={initNextStandardRound}>Next Round</button>;
    }

    function renderLeitnerBtn() {
        let level = score.currentLevel + 1;

        if (score.wrong) {
            level -= level > 1 ? 1 : 0;
        }
        else {
            level += 1;
        }
        return <button className="btn deck-score-btn" onClick={initNextLeitnerLevel}>Continue to Level {level}</button>;
    }

    function renderNextBtn() {
        if (mode === "standard") {
            return renderStandardBtn();
        }
        return renderLeitnerBtn();
    }

    return (
        <React.Fragment>
            <h1 className="component-header study-deck-title">{title}</h1>
            <div className="deck-score-container">
                <h3 className="deck-score-title">Session Results</h3>
                <div className="deck-score-in-percent">{Math.round(session.right / session.total * 100)}%</div>
                <div className="deck-score-bars">
                    <div className="deck-score-bar-container">
                        <span className="deck-score-bar-name">Right</span>
                        <div className="deck-score-bar">
                            <StudyScoreBar score={session} type="maxWidth" barName="right"
                                className="deck-score-bar-inner" />
                        </div>
                    </div>
                    <div className="deck-score-bar-container">
                        <span className="deck-score-bar-name">Wrong</span>
                        <div className="deck-score-bar">
                            <StudyScoreBar score={session} type="maxWidth" barName="wrong"
                                className="deck-score-bar-inner" />
                        </div>
                    </div>
                </div>
                <div className="deck-score-btn-container">
                    {!score.isLast && renderNextBtn()}
                    <Link to="/decks" className="btn">Close</Link>
                </div>
            </div>
        </React.Fragment>
    );
}
