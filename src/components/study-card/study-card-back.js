import React from "react";

export default function StudyCardBack({ card, revealBack }) {
    const side = "back";
    const { visibleSide } = card;
    const { text, textSize } = card[side];

    return (
        <div className={`side-container${visibleSide === side ? " visible" : ""}`}>
            <div className="side-name">{side}</div>
            <div className="side">
                <div className="study-side-content">
                    {card.isBackSideRevealed ?
                        <div className="side-text study-side-text">
                            <div style={{ fontSize: `${textSize}px` }}>{text}</div>
                        </div> :
                        <button className="btn study-reveal-btn" onClick={revealBack}><div>Reveal</div></button>
                    }
                </div>
            </div>
        </div>
    );
}
