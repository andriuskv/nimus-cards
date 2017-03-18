import React from "react";
import { Link } from "react-router-dom";
import StudyScoreBar from "./study-score-bar";

export default function StudySetScore({ score, mode, cardCount, initNextStandardRound, initNextLeitnerLevel }) {
    function renderStandardBtn() {
        return score.right !== score.total && (
            <button className="btn set-score-btn" onClick={initNextStandardRound}>Go to Next Round</button>
        );
    }

    function renderLeitnerBtn() {
        let level = score.currentLevel + 1;

        if (score.wrong) {
            level -= level > 1 ? 1 : 0;
        }
        else {
            level += 1;
        }
        return score.levels[4].length !== cardCount && (
            <button className="btn set-score-btn" onClick={initNextLeitnerLevel}>Continue to Level {level}</button>
        );
    }

    return (
        <div className="set-score-container">
                <h3 className="set-score-title">
                    {mode === "standard" ? "Round" : "Level"} {score.currentLevel + 1} Results</h3>
                <div className="set-score-in-percent">
                    <span>{Math.round(score.right / score.total * 100)}%</span>
                </div>
                <div className="set-score-bars">
                    <div className="set-score-bar-container">
                        <span className="set-score-bar-name">Right </span>
                        <div className="set-score-bar">
                            <StudyScoreBar score={score} name="right" />
                        </div>
                    </div>
                    <div className="set-score-bar-container">
                        <span className="set-score-bar-name">Wrong </span>
                        <div className="set-score-bar">
                            <StudyScoreBar score={score} name="wrong" />
                        </div>
                    </div>
                </div>
                <div className="set-score-btn-container">
                    {mode === "standard" ? renderStandardBtn() : renderLeitnerBtn()}
                    <Link to="/flashcards" className="btn">Close</Link>
                </div>
        </div>
    );
}
