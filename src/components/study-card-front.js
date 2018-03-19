import React from "react";
import Attachment from "./attachment";

export default function CardFront({ card, visibleSide, textStyles }) {
    const side = "front";
    const { attachment, text } = card[side];

    return (
        <div className={`side-container${visibleSide === side ? " visible" : ""}`}>
            <div className="side-name">{side}</div>
            <div className="side">
                <div className="study-side-content">
                    {attachment &&
                        <div className={`side-panel-container${text ? "" : " full"}`}>
                            <Attachment {...attachment}></Attachment>
                        </div>
                    }
                    {text &&
                        <div className="side-text study-side-text">
                            <div style={textStyles}>{text}</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
