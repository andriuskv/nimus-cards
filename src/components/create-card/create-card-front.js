import React, { Fragment, useState } from "react";
import TextSizeSelect from "./create-card-text-size-select";
import UploadPanel from "./create-card-upload-panel";
import Attachment from "../attachment";
import Icon from "../icon";

export default function CreateCardFrontSide(props) {
    const [card, updateCard] = useState({ ...props.card });
    const [uploadPanel, toggleUploadPanel] = useState({ type: "", visible: false });

    function removeAttachment() {
        delete card.front.attachment;
        updateCard({ ...card });
    }

    function showUploadPanel(type) {
        toggleUploadPanel({ visible: true, type });
    }

    function hideUploadPanel() {
        toggleUploadPanel({ visible: false, type: "" });
    }

    function addAttachment(file, type) {
        card.front.attachment = { file, type };
        updateCard({ ...card });
        hideUploadPanel();
    }

    function renderToolbarBtns() {
        return ["image", "audio"].map((type, index) => (
            <button key={index}
                className="btn-icon toolbar-btn"
                title={`Upload ${type}`} onClick={() => showUploadPanel(type)}>
                <Icon name={type} />
            </button>
        ));
    }

    function renderAttachment(attachment) {
        return (
            <div className="side-panel-container">
                <button type="button" className="btn-icon create-side-panel-btn"
                    onClick={removeAttachment} title="Remove attachment">
                    <Icon name="remove" />
                </button>
                <Attachment {...attachment}></Attachment>
            </div>
        );
    }

    return (
        <Fragment>
            <div className={`side-container ${props.visible ? " visible" : ""}`}>
                <div className="side-name">front</div>
                <div className="side">
                    <div className="create-side-toolbar">
                        {renderToolbarBtns()}
                        <TextSizeSelect
                            sideName="front"
                            textSize={card.front.textSize}
                            handleTextSizeSelect={props.handleTextSizeSelect} />
                    </div>
                    <div className="side-content create-side-content">
                        {card.front.attachment && renderAttachment(card.front.attachment)}
                        <textarea className="input create-side-text-input side-text"
                            name="front"
                            value={card.front.text}
                            style={{ fontSize: `${card.front.textSize}px` }}
                            onChange={props.handleChange}></textarea>
                    </div>
                </div>
            </div>
            {uploadPanel.visible &&
                <UploadPanel
                    type={uploadPanel.type}
                    hide={hideUploadPanel}
                    addAttachment={addAttachment} />
            }
        </Fragment>
    );
}
