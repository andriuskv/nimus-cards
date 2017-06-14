import React from "react";

export default function CardSide({ side, card, revealBack }) {
    function isVisible(side, backSide) {
        return side === "front" && !backSide || side === "back" && backSide;
    }

    function renderAttachment(attachment) {
        if (!attachment) {
            return;
        }
        const cardSide = card[side];
        const src = typeof attachment.file === "string" ? attachment.file : URL.createObjectURL(attachment.file);
        let element = null;

        if (attachment.type === "image") {
            element = <img src={src} alt="" className="side-image" />;
        }
        else if (attachment.type === "audio") {
            element = <audio src={src} className="side-audio" controls></audio>;
        }

        return (
            <div className={`side-panel-container${cardSide.text ? "": " full"}`}>
                {element}
            </div>
        );
    }

    function getTextStyles() {
        const { textSize } = card[side];

        if (textSize) {
            return {
                fontSize: `${card[side].textSize}px`
            };
        }
    }

    return (
        <div className={`side-container${isVisible(side, card.back) ? " visible" : ""}`}>
            <div className="side-name">{side}</div>
            <div className="side">
                {card[side] ?
                    <div className="side-content study-side-content">
                        {renderAttachment(card[side].attachment)}
                        {card[side].text && (
                            <div className="side-text study-side-text">
                                <div style={getTextStyles()}>{card[side].text}</div>
                            </div>
                        )}
                    </div> :
                    <div className="side-content study-side-content">
                        <button className="btn side-text study-side-text study-reveal-btn" onClick={revealBack}>
                            <div>Reveal</div>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}
