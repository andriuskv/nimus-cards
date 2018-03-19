import React from "react";
import Icon from "./icon";

function renderToolbarBtns(uploadType, toggleUploadPanel) {
    return ["image", "audio"].map((type, index) => (
        <button key={index}
            className={`btn-icon toolbar-btn${uploadType === type ? " active" : ""}`}
            title={`Upload ${type}`} onClick={() => toggleUploadPanel(type)}>
            <Icon name={type} />
        </button>
    ));
}

export default function CreateCardToolbar(props) {
    const { card, side, uploadType, toggleUploadPanel, handleTextSizeSelect } = props;
    const { textSize } = card[side];

    return (
        <div className="create-side-toolbar">
            {side === "front" && renderToolbarBtns(uploadType, toggleUploadPanel)}
            <select defaultValue={textSize} title="Text size"
                onInput={(e) => handleTextSizeSelect(e, side)} className="input create-side-select">
                <option value="16">16px</option>
                <option value="24">24px</option>
                <option value="36">36px</option>
                <option value="48">48px</option>
            </select>
        </div>
    );
}
