import React, { Fragment, useState } from "react";
import { useStore } from "../../../../context/CreateDeckContext";
import TextSizeSelect from "../TextSizeSelect";
import UploadPanel from "./CreateCardUploadPanel";
import Attachment from "./CreateCardAttachment";
import Icon from "../../../Icon";

export default function CreateCardFront({ index, side, handleChange }) {
    const { dispatch } = useStore();
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
                className="btn btn-icon toolbar-btn"
                title={`Upload ${type}`} onClick={() => showUploadPanel(type)}>
                <Icon name={type} />
            </button>
        ));
    }

    function renderAttachment() {
        return (
            <div className="create-side-panel">
                <button type="button" className="btn btn-icon create-side-panel-btn"
                    onClick={removeAttachment} title="Remove attachment">
                    <Icon name="remove" />
                </button>
                <Attachment {...attachment} />
            </div>
        );
    }

    return (
        <Fragment>
            <div>
                <div className="deck-form-field-title">FRONT</div>
                <div className="create-side-toolbar">
                    {renderToolbarBtns()}
                    <TextSizeSelect
                        textSize={textSize}
                        handleChange={event => handleChange(event, "front", "textSize")} />
                </div>
                <div className="create-side-content">
                    {attachment && renderAttachment()}
                    <textarea className="input create-side-text-input"
                        value={text}
                        style={{ fontSize: `${textSize}px` }}
                        onChange={event => handleChange(event, "front", "text")}></textarea>
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
