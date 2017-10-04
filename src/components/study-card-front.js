import React from "react";
import Attachment from "./attachment";

export default function CardFront({ card, visibleSide, textStyles }) {
    const side = "front";
    const cardSide = card[side];

    return (
        <div className={`side-container${visibleSide === side ? " visible" : ""}`}>
            <div className="side-name">{side}</div>
            <div className="side">
                <div className="side-content study-side-content">
                    {cardSide.attachment && (
                        <div className={`side-panel-container${cardSide.text ? "" : " full"}`}>
                            <Attachment {...cardSide.attachment}></Attachment>
                        </div>
                    )}
                    {cardSide.text && (
                        <div className="side-text study-side-text">
                            <div style={textStyles}>{cardSide.text}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
