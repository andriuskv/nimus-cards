import React from "react";

export default function StudyScoreBar({ score, name }) {
    function renderBar(barName) {
        if (!score.total) {
            return <div className={`study-score-bar study-score-${barName}-bar`}>{score[barName]}</div>;
        }
        if (score[barName]) {
            return <div className={`study-score-bar study-score-${barName}-bar`}
                style={{ width: `${score[barName] / score.total * 100}%` }}>{score[barName]}</div>;
        }
        return null;
    }

    return renderBar(name);
}
