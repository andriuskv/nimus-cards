import React from "react";
import Icon from "../components/icon";

export default function CreateSet(props) {
    const { card, side } = props;
    const cardSide = card[side];

    function renderToolbarBtn(type) {
        return (
            <button className={`btn-icon toolbar-btn${props.uploadType === type ? " active" : ""}`} title={`Upload ${type}`} onClick={() => props.showUploadPanel(type)}>
                <Icon name={type} />
            </button>
        );
    }

    function renderAttachment(attachment) {
        if (!attachment) {
            return null;
        }
        const { file, type } = attachment;
        const src = typeof file === "string" ? file : URL.createObjectURL(file);
        let element = null;

        if (type === "image") {
            element = <img src={src} alt="" className="side-image" />;
        }
        else if (type === "audio") {
            element = <audio src={src} className="side-audio" controls></audio>;
        }

        return (
            <div className="side-panel-container">
                <button type="button" className="btn-icon create-side-panel-btn"
                    onClick={props.removeAttachment} title="Remove attachment">
                    <Icon name="remove" />
                </button>
                {element}
            </div>
        );
    }

    function renderUploadPanel(cardSide) {
        const message = cardSide.panelMessage;

        return (
            <div className="side-panel-container">
                <ul className="create-side-upload-items">
                    <li className="create-side-upload-item create-side-upload-device">
                        <div>Upload from device</div>
                        <label className="btn" tabIndex="0">
                            <span>Upload</span>
                            <input type="file" className="file-input" onChange={props.handleFileUpload} />
                        </label>
                    </li>
                    <li className="create-side-upload-item create-side-upload-url">
                        <div>Upload from url</div>
                        <form onSubmit={props.handleFileUploadFormURL}>
                            <input type="text" name="url" className="input" />
                            <button className="btn">Upload</button>
                        </form>
                    </li>
                </ul>
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
                    {renderToolbarBtn("image")}
                    {renderToolbarBtn("audio")}
                    <select defaultValue={cardSide.textSize || 16} title="Text size" onInput={props.handleTextSizeSelect} className="input create-side-select">
                        <option value="16">16px</option>
                        <option value="24">24px</option>
                        <option value="36">36px</option>
                        <option value="48">48px</option>
                    </select>
                </div>
                <div className="side-content create-side-content">
                    {props.isUploadPanelVisible ?
                        renderUploadPanel(cardSide) :
                        renderAttachment(cardSide.attachment)
                    }
                    <textarea className="create-side-text-input side-text"
                        defaultValue={cardSide.text}
                        style={{ fontSize: `${cardSide.textSize}px` }}
                        onInput={props.handleInput}></textarea>
                </div>
            </div>
        </div>
    );
}
