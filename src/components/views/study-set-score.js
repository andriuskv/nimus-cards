import React from "react";

export default function StudySetScore({ score, closeScoreboard }) {
    return (
        <div className="set-score-container">
            <h3 className="set-score-title">Test results</h3>
            <div className="set-score-in-percent">{Math.round(score.right / score.total * 100)}%</div>
            <div className="set-score-in-words">{score.right} out of {score.total} correct</div>
            <button className="btn" onClick={closeScoreboard}>Close</button>
        </div>
    );
}
