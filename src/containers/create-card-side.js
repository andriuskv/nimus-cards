import React from "react";
import Icon from "../components/icon";

export default class CreateCardSide extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            side: props.side,
            card: props.card
        };
    }

    removeAttachment = () => {
        const { card, side } = this.state;

        delete card[side].attachment;
        this.setState({ card });
    }

    handleInput = ({ target: { value } }) => {
        const { card, side } = this.state;

        if (value !== card[side].text) {
            card[side].text = value;
            this.setState({ card });
        }
    }

    showUploadPanelMessage(message) {
        const { card, side } = this.state;
        card[side].panelMessage = message;

        this.setState({ card });

        setTimeout(() => {
            card[side].panelMessage = "";
            this.setState({ card });
        }, 3200);
    }

    handleFileUpload = ({ target }) => {
        const { uploadType: type } = this.state;
        const [file] = target.files;

        target.value = "";

        if (file.type.split("/")[0] === type) {
            this.addAttachment(file, type);
            return;
        }
        this.showUploadPanelMessage(`File is not an ${type}`);
    }

    addAttachment(file, type) {
        const { card, side } = this.state;
        card[side].attachment = Object.assign({}, { file, type });

        this.setState({
            card,
            isUploadPanelVisible: false,
            uploadType: ""
        });
    }

    handleFileUploadFormURL = (event) => {
        const url = event.target.elements.url.value.trim();
        const { uploadType: type } = this.state;

        event.preventDefault();

        if (!url) {
            this.showUploadPanelMessage(`Please specify valid url`);
            return;
        }
        if (type === "image") {
            const image = new Image();

            image.onload = () => {
                this.addAttachment(url, type);
            };

            image.onerror = event => {
                this.showUploadPanelMessage(`URL doesn't contain ${type} file`);
                console.log(event);
            };

            image.src = url;
        }
        else if (type === "audio") {
            const audio = new Audio(url);

            audio.onloadedmetadata = () => {
                this.addAttachment(url, type);
            };

            audio.onerror = event => {
                this.showUploadPanelMessage(`URL doesn't contain ${type} file`);
                console.log(event);
            };
        }
    }

    handleTextSizeSelect = event => {
        const { card, side } = this.state;

        card[side].textSize = event.target.value;
        this.setState({ card });
    }

    showUploadPanel = type => {
        this.setState({
            isUploadPanelVisible: true,
            uploadType: type
        });
    }

    closeUploadPanel = () => {
        this.setState({
            isUploadPanelVisible: false,
            uploadType: ""
        });
    }

    renderFileUploadBtn() {
        return (
            <label className="btn" tabIndex="0" title={`Upload ${this.state.uploadType}`}>
                <span>Upload</span>
                <input type="file" className="file-input" onChange={this.handleFileUpload} />
            </label>
        );
    }

    renderUploadPanel(cardSide) {
        const message = cardSide.panelMessage;

        return (
            <div className="side-panel-container">
                <ul className="create-side-upload-items">
                    <li className="create-side-upload-item create-side-upload-device">
                        <div>Upload from device</div>
                        {this.renderFileUploadBtn()}
                    </li>
                    <li className="create-side-upload-item create-side-upload-url">
                        <div>Upload from url</div>
                        <form onSubmit={this.handleFileUploadFormURL}>
                            <input type="text" name="url" className="input" />
                            <button className="btn">Upload</button>
                        </form>
                    </li>
                </ul>
                {message && <div className="create-side-upload-panel-message">{message}</div>}
                <button type="button" className="btn-icon create-side-panel-btn"
                    onClick={this.closeUploadPanel} title="Close panel">
                    <Icon name="close" />
                </button>
            </div>
        );
    }

    renderToolbarBtn(type) {
        return (
            <button type="button" className={`btn-icon toolbar-btn${this.state.uploadType === type ? " active" : ""}`} title={`Upload ${type}`} onClick={() => this.showUploadPanel(type)}>
                <Icon name={type} />
            </button>
        );
    }

    renderAttachment(attachment) {
        if (!attachment) {
            return null;
        }
        const src = typeof attachment.file === "string" ? attachment.file : URL.createObjectURL(attachment.file);
        let element = null;

        if (attachment.type === "image") {
            element = <img src={src} alt="" className="side-image" />;
        }
        else if (attachment.type === "audio") {
            element = <audio src={src} className="side-audio" controls></audio>;
        }

        return (
            <div className="side-panel-container">
                <button type="button" className="btn-icon create-side-panel-btn"
                    onClick={this.removeAttachment} title="Remove attachment">
                    <Icon name="remove" />
                </button>
                {element}
            </div>
        );
    }

    render() {
        const { card, side } = this.state;
        const cardSide = card[side];
        const style = {
            fontSize: `${cardSide.textSize}px`
        };

        return (
            <div className={`side-container${card.visibleSide === side ? " visible": ""}`}>
                <span className="side-name">{side}</span>
                <div className="side">
                    <div className="create-side-toolbar">
                        {this.renderToolbarBtn("image")}
                        {this.renderToolbarBtn("audio")}
                        <select defaultValue={cardSide.textSize || 16} title="Text size" onInput={this.handleTextSizeSelect} className="input create-side-select">
                            <option value="16">16px</option>
                            <option value="24">24px</option>
                            <option value="36">36px</option>
                            <option value="48">48px</option>
                        </select>
                    </div>
                    <div className="side-content create-side-content">
                        {this.state.isUploadPanelVisible ?
                            this.renderUploadPanel(cardSide) :
                            this.renderAttachment(cardSide.attachment)
                        }
                        <textarea className="create-side-text-input side-text"
                            defaultValue={cardSide.text} style={style} onInput={this.handleInput}></textarea>
                    </div>
                </div>
            </div>
        );
    }
}
