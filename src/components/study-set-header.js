import React from "react";
import StudyScoreBar from "./study-score-bar";

export default function StudySetHeader({ score, mode }) {
    function renderScoreBar(score) {
        return (
            <div>
                <div className="study-score-bar-name-container">
                    {(score.total && !score.right) ? null : <div>Right</div>}
                    {(score.total && !score.wrong) ? null : <div>Wrong</div>}
                </div>
                <div>
                    <StudyScoreBar score={score} type="study" barName="right" />
                    <StudyScoreBar score={score} type="study" barName="wrong" />
                </div>
            </div>
        );
    }

    function renderScoreTable(score) {
        return (
            <div className="study-score-table">
                <div className="study-score-table-cell">
                    <div className="study-score-table-cell-name">Level</div>
                    <div>Card Count</div>
                </div>
                {score.levels.map((level, index) => (
                    <div className={`study-score-table-cell ${score.currentLevel === index ? "active" : ""}`}
                        key={index}
                    >
                        <div className="study-score-table-cell-name">
                            {index === 4 ? "Memorized" : index + 1}
                        </div>
                        <div>{level.length}</div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="study-header">
            {score && (mode === "standard" ? renderScoreBar(score) : renderScoreTable(score))}
        </div>
    );
}
