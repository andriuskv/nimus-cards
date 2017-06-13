import React from "react";

export default function StudyScoreBar({ score, type, barName, className = "" }) {
    function renderBar(score, barName) {
        if (!score.total) {
            return <div className={`score-bar score-${barName}-bar`}>{score[barName]}</div>;
        }
        const style = {
            [type]: `${score[barName] / score.total * 100}%`
        };

        return <div className={`score-bar score-${barName}-bar ${className}`} style={style}>{score[barName]}</div>;
    }

    return renderBar(score, barName);
}
