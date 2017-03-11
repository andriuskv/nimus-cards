import React from "react";

export default function StudyScoreBar({ score }) {
    function renderBar(barName) {
        if (!score.total) {
            return <div className={`study-score-${barName}-bar`}>{score[barName]}</div>;
        }
        if (score[barName]) {
            return <div className={`study-score-${barName}-bar`}
                style={{ width: `${score[barName] / score.total * 100}%` }}>{score[barName]}</div>;
        }
    }

    return (
        <div className="study-score-bar">
            {renderBar("right")}
            {renderBar("wrong")}
        </div>
    );
}
