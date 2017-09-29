import React from "react";
import Attachment from "./attachment";
import Icon from "../components/icon";

export default function CreateCardFront(props) {
    const { card, side } = props;
    const cardSide = card[side];

    function renderToolbarBtns(uploadType) {
        return ["image", "audio"].map((type, index) => (
            <button key={index}
                className={`btn-icon toolbar-btn${uploadType === type ? " active" : ""}`}
                title={`Upload ${type}`} onClick={() => props.toggleUploadPanel(type)}>
                <Icon name={type} />
            </button>
        ));
    }

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
            <div className="side-panel-container create-side-panel-container">
                <div className="create-side-upload-item create-side-upload-device">
                    <div>Upload {uploadType} from device</div>
                    <label className="btn" tabIndex="0">
                        <span>Upload</span>
                        <input type="file" className="file-input" onChange={props.handleFileUpload} />
                    </label>
                </div>
                <div className="create-side-upload-item">
                    <div>Upload {uploadType} from url</div>
                    <form className="create-side-upload-item-form" onSubmit={props.handleFileUploadFormURL}>
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
        <div className={`side-container${card.visibleSide === side ? " visible": ""}`}>
            <span className="side-name">{side}</span>
            <div className="side">
                <div className="create-side-toolbar">
                    {renderToolbarBtns(props.uploadType)}
                    <select defaultValue={cardSide.textSize || 16} title="Text size" onInput={(e) => props.handleTextSizeSelect(e, side)} className="input create-side-select">
                        <option value="16">16px</option>
                        <option value="24">24px</option>
                        <option value="36">36px</option>
                        <option value="48">48px</option>
                    </select>
                </div>
                <div className="side-content create-side-content">
                    {props.isUploadPanelVisible ?
                        renderUploadPanel(props.uploadType, cardSide.panelMessage) :
                        renderAttachment(cardSide.attachment)
                    }
                    <textarea className="create-side-text-input side-text"
                        defaultValue={cardSide.text}
                        style={{ fontSize: `${cardSide.textSize}px` }}
                        onInput={(e) => props.handleInput(e, side)}></textarea>
                </div>
            </div>
        </div>
    );
}
