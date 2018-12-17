import React from "react";

export default function TextSizeSelect({ sideName, textSize, handleTextSizeSelect }) {
    return (
        <select className="input create-side-select" title="Text size"
            value={textSize}
            name={sideName}
            onChange={handleTextSizeSelect}>
            <option value="16">16px</option>
            <option value="24">24px</option>
            <option value="36">36px</option>
            <option value="48">48px</option>
        </select>
    );
}
