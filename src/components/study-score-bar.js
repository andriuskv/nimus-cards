import React from "react";

export default function StudyScoreBar({ score, name }) {
    const style = {
        width: `${score.total ? score[name] / score.total * 100 : 50}%`
    };

    return <div className={`score-bar score-${name}-bar`} style={style}>{score[name]}</div>;
}
