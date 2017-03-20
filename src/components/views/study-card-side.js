import React from "react";

export default function CardSide({ side, content, getSideElement, revealBack }) {
    function renderSide(side, content) {
        return (
            <div className="study-side">
                <div className="study-side-content-container" ref={elem => getSideElement(elem, side)}>
                    <p className="study-side-content">{content}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="study-side-container">
            <div className="side-name">{side}</div>
                {content ?
                    renderSide(side, content) :
                    <button className="btn study-side study-reveal-btn" onClick={revealBack}>Reveal</button>
                }
        </div>
    );
}
