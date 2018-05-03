import React from "react";

export default function TextSizeSelect({ textSize, handleTextSizeSelect }) {
    return (
        <select defaultValue={textSize} title="Text size"
            onInput={handleTextSizeSelect} className="input create-side-select">
            <option value="16">16px</option>
            <option value="24">24px</option>
            <option value="36">36px</option>
            <option value="48">48px</option>
        </select>
    );
}
