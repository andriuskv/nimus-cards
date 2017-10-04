import React from "react";

export default function CreateCardBack(props) {
    const { card, side } = props;
    const cardSide = card[side];

    return (
        <div className={`side-container${card.visibleSide === side ? " visible": ""}`}>
            <div className="side-name">{side}</div>
            <div className="side">
                <div className="create-side-toolbar">
                    <select defaultValue={cardSide.textSize || 16} title="Text size" onInput={(e) => props.handleTextSizeSelect(e, side)} className="input create-side-select">
                        <option value="16">16px</option>
                        <option value="24">24px</option>
                        <option value="36">36px</option>
                        <option value="48">48px</option>
                    </select>
                </div>
                <div className="side-content create-side-content">
                    <textarea className="create-side-text-input side-text"
                        defaultValue={cardSide.text}
                        style={{ fontSize: `${cardSide.textSize}px` }}
                        onInput={(e) => props.handleInput(e, side)}></textarea>
                </div>
            </div>
        </div>
    );
}
