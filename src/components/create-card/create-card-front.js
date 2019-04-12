import React, { Fragment, useState, useContext } from "react";
import { CreateDeckContext } from "../../context/CreateDeckContext";
import TextSizeSelect from "./create-card-text-size-select";
import UploadPanel from "./create-card-upload-panel";
import Attachment from "../attachment";
import Icon from "../icon";

export default function CreateCardFrontSide({ index, visible, handleChange }) {
    const { state, dispatch } = useContext(CreateDeckContext);
    const [uploadPanel, toggleUploadPanel] = useState({ type: "", visible: false });
    const { front } = state.cards[index];

    function addAttachment(file, type) {
        dispatch({
            type: "ADD_ATTACHMENT",
            index,
            attachment: { file, type }
        });
        hideUploadPanel();
    }

    function removeAttachment() {
        dispatch({ type: "REMOVE_ATTACHMENT", index });
    }

    function showUploadPanel(type) {
        toggleUploadPanel({ visible: true, type });
    }

    function hideUploadPanel() {
        toggleUploadPanel({ visible: false, type: "" });
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
            <div className={`side-container ${visible ? " visible" : ""}`}>
                <div className="side-name">front</div>
                <div className="side">
                    <div className="create-side-toolbar">
                        {renderToolbarBtns()}
                        <TextSizeSelect
                            textSize={front.textSize}
                            handleChange={event => handleChange(event, "front", "textSize")} />
                    </div>
                    <div className="side-content create-side-content">
                        {front.attachment && renderAttachment(front.attachment)}
                        <textarea className="input create-side-text-input side-text"
                            value={front.text}
                            style={{ fontSize: `${front.textSize}px` }}
                            onChange={event => handleChange(event, "front", "text")}></textarea>
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
