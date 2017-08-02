import React from "react";
import { Link } from "react-router-dom";
import Container from "./container";
import StudyScoreBar from "./study-score-bar";

export default function StudySetScore({ title, score, mode, initNextStandardRound, initNextLeitnerLevel }) {

    const { session } = score;

    function renderStandardBtn() {
        return <button className="btn set-score-btn" onClick={initNextStandardRound}>Go to Next Round</button>;
    }

    function renderLeitnerBtn() {
        let level = score.currentLevel + 1;

        if (score.wrong) {
            level -= level > 1 ? 1 : 0;
        }
        else {
            level += 1;
        }
        return <button className="btn set-score-btn" onClick={initNextLeitnerLevel}>Continue to Level {level}</button>;
    }

    function renderNextBtn() {
        if (mode === "standard") {
            return renderStandardBtn();
        }
        return renderLeitnerBtn();
    }

    return (
        <Container title={title}>
            <div className="set-score-container">
                <h3 className="set-score-title">Session Results</h3>
                <div className="set-score-in-percent">{Math.round(session.right / session.total * 100)}%</div>
                <div className="set-score-bars">
                    <div className="set-score-bar-container">
                        <span className="set-score-bar-name">Right</span>
                        <div className="set-score-bar">
                            <StudyScoreBar score={session} type="maxWidth" barName="right"
                                className="set-score-bar-inner" />
                        </div>
                    </div>
                    <div className="set-score-bar-container">
                        <span className="set-score-bar-name">Wrong</span>
                        <div className="set-score-bar">
                            <StudyScoreBar score={session} type="maxWidth" barName="wrong"
                                className="set-score-bar-inner" />
                        </div>
                    </div>
                </div>
                <div className="set-score-btn-container">
                    {!score.isLast && renderNextBtn()}
                    <Link to="/flashcards" className="btn">Close</Link>
                </div>
            </div>
        </Container>
    );
}
