import React from "react";

export default function CardSide({ index, side, content, hasError }) {
    return (
        <label className="create-side">
            <div className="side-name">{side}</div>
            <textarea id={`${side}-${index}`} className="input create-side-input" name={side}
                defaultValue={content}></textarea>
            { hasError && <div className="create-side-message">Please fill in card {side}</div>}
        </label>
    );
}
