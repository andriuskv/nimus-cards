import React from "react";

export default function CardSide({ side, content, getSideElement, revealBack }) {
    function renderSide(side, content) {
        return (
            <div className="study-side" ref={elem => getSideElement(elem, side)}>
                <p className="study-side-content">{content}</p>
            </div>
        );
    }

    return (
        <div className="study-side-container">
            <div className="side-name">{side}</div>
            {content ?
                renderSide(side, content) :
                <button className="btn study-reveal-btn" onClick={revealBack}>Reveal</button>
            }
        </div>
    );
}
