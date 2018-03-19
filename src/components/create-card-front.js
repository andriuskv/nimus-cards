import React from "react";
import Toolbar from "./create-card-toolbar";
import Attachment from "./attachment";
import Icon from "./icon";

export default function CreateCardFront(props) {
    const { card, side } = props;
    const { attachment, panelMessage, text, textSize } = card[side];

    function renderAttachment(attachment) {
        if (!attachment) {
            return null;
        }
        return (
            <div className="side-panel-container">
                <button type="button" className="btn-icon create-side-panel-btn"
                    onClick={props.removeAttachment} title="Remove attachment">
                    <Icon name="remove" />
                </button>
                <Attachment {...attachment}></Attachment>
            </div>
        );
    }

    function renderUploadPanel(uploadType, message) {
        return (
            <div className="side-panel-container">
                <div className="create-side-upload-item">
                    <div>Upload {uploadType} from device</div>
                    <label className="btn" tabIndex="0">
                        <span>Upload</span>
                        <input type="file" className="file-input" onChange={props.handleFileUpload} />
                    </label>
                </div>
                <div className="create-side-upload-item">
                    <div>Upload {uploadType} from url</div>
                    <form onSubmit={props.handleFileUploadFormURL}>
                        <input type="text" name="url" className="input" />
                        <button className="btn">Upload</button>
                    </form>
                </div>
                {message && <div className="create-side-upload-panel-message">{message}</div>}
                <button type="button" className="btn-icon create-side-panel-btn"
                    onClick={props.closeUploadPanel} title="Close panel">
                    <Icon name="close" />
                </button>
            </div>
        );
    }

    return (
        <div className={`side-container${card.visibleSide === side ? " visible" : ""}`}>
            <div className="side-name">{side}</div>
            <div className="side">
                <Toolbar {...props} />
                <div className="side-content create-side-content">
                    {props.isUploadPanelVisible ?
                        renderUploadPanel(props.uploadType, panelMessage) :
                        renderAttachment(attachment)
                    }
                    <textarea className="input create-side-text-input side-text"
                        defaultValue={text}
                        style={{ fontSize: `${textSize}px` }}
                        onInput={(e) => props.handleInput(e, side)}></textarea>
                </div>
            </div>
        </div>
    );
}
