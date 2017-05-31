import React from "react";

export default function StudyScoreBar({ score, type, barName, className = "" }) {
    function renderBar(score, barName) {
        if (!score.total) {
            return <div className={`score-bar score-${barName}-bar`}>{score[barName]}</div>;
        }

        if (score[barName]) {
            const width = score[barName] / score.total * 100;
            const propName = type === "study" ? "width" : "maxWidth";

            return <div className={`score-bar score-${barName}-bar expand ${className}`}
                style={{ [propName]: `${width}%` }}>{score[barName]}</div>;
        }
        return null;
    }

    return renderBar(score, barName);
}
