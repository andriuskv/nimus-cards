import React, { Fragment, useState, useContext } from "react";
import { CreateDeckContext } from "../../context/CreateDeckContext";
import TextSizeSelect from "./create-card-text-size-select";
import UploadPanel from "./create-card-upload-panel";
import Attachment from "../attachment";
import Icon from "../icon";

export default function CreateCardFrontSide({ index, side, handleChange }) {
    const { dispatch } = useContext(CreateDeckContext);
    const [uploadPanel, toggleUploadPanel] = useState({ type: "", visible: false });
    const { text, textSize, attachment } = side;

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

    function renderAttachment() {
        return (
            <div className="side-panel-container">
                <button type="button" className="btn-icon create-side-panel-btn"
                    onClick={removeAttachment} title="Remove attachment">
                    <Icon name="remove" />
                </button>
                <Attachment {...attachment} />
            </div>
        );
    }

    return (
        <Fragment>
            <div className="side-container">
                <div className="create-side-name">FRONT</div>
                <div className="side">
                    <div className="create-side-toolbar">
                        {renderToolbarBtns()}
                        <TextSizeSelect
                            textSize={textSize}
                            handleChange={event => handleChange(event, "front", "textSize")} />
                    </div>
                    <div className="create-side-content">
                        {attachment && renderAttachment()}
                        <textarea className="input create-side-text-input side-text"
                            value={text}
                            style={{ fontSize: `${textSize}px` }}
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
