import React from "react";
import { Link } from "react-router-dom";
import StudyScoreBar from "./study-score-bar";

export default function StudySetScore({ score, initNextRound }) {
    function renderNextRoundBtn() {
        return <button className="btn set-score-btn" onClick={initNextRound}>Go To Next Round</button>;
    }

    return (
        <div className="set-score-container">
            <h3 className="set-score-title">Round results</h3>
            <div className="set-score-in-percent">
                <span>{Math.round(score.right / score.total * 100)}%</span>
                <div className="set-score-bar-container">
                    <StudyScoreBar score={score} />
                </div>
            </div>
            <div className="set-score-in-words">{score.right} out of {score.total} correct</div>
            <div className="set-score-btn-container">
                {score.right !== score.total && renderNextRoundBtn()}
                <Link to="/flashcards" className="btn">Close</Link>
            </div>
        </div>
    );
}
