import React from "react";
import StudyScoreBar from "./study-score-bar";

export default function StudyDeckHeader({ score, mode }) {
    return (
        <div className="study-header">
            {mode === "standard" ?
                <React.Fragment>
                    <div className="study-score-bar-name-container">
                        <span>Right</span>
                        <span>Wrong</span>
                    </div>
                    <div>
                        <StudyScoreBar score={score} name="right" />
                        <StudyScoreBar score={score} name="wrong" />
                    </div>
                </React.Fragment> :
                <div className="study-score-table">
                    <div className="study-score-table-cell">
                        <div className="study-score-table-cell-name">Level</div>
                        <div>Card Count</div>
                    </div>
                    {score.levels.map((level, index) => (
                        <div className={`study-score-table-cell${score.currentLevel === index ? " active" : ""}`} key={index}>
                            <div className="study-score-table-cell-name">
                                {index === 4 ? "Memorized" : index + 1}
                            </div>
                            <div>{level.length}</div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}
