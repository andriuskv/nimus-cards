import React from "react";
import Toolbar from "./create-card-toolbar";

export default function CreateCardBack(props) {
    const { card, side, handleInput } = props;
    const { text, textSize } = card[side];

    return (
        <div className={`side-container${card.visibleSide === side ? " visible" : ""}`}>
            <div className="side-name">{side}</div>
            <div className="side">
                <Toolbar {...props} />
                <div className="side-content create-side-content">
                    <textarea className="input create-side-text-input side-text"
                        defaultValue={text}
                        style={{ fontSize: `${textSize}px` }}
                        onInput={e => handleInput(e, side)}></textarea>
                </div>
            </div>
        </div>
    );
}
