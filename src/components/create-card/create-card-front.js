import React from "react";
import TextSizeSelect from "./create-card-text-size-select";
import Attachment from "../attachment";
import Icon from "../icon";

export default class CreateCardFrontSide extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            card: props.card
        };
        this.side = "front";
    }

    removeAttachment = () => {
        const { card } = this.state;

        delete card[this.side].attachment;
        this.setState({ card });
    }

    showUploadPanelMessage(message) {
        const { card } = this.state;
        card[this.side].panelMessage = message;

        this.setState({ card });

        setTimeout(() => {
            card[this.side].panelMessage = "";
            this.setState({ card });
        }, 3200);
    }

    handleTextSizeSelect = event => {
        this.props.handleTextSizeSelect(event, this.side);
    }

    handleInput = event => {
        this.props.handleInput(event, this.side);
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
        const { card } = this.state;
        card[this.side].attachment = { file, type };

        this.setState({
            card,
            isUploadPanelVisible: false,
            uploadType: ""
        });
    }

    handleFileUploadFormURL = event => {
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

    toggleUploadPanel = type => {
        if (type === this.state.uploadType) {
            this.closeUploadPanel();
            return;
        }
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

    renderToolbarBtns(uploadType) {
        return ["image", "audio"].map((type, index) => (
            <button key={index}
                className={`btn-icon toolbar-btn${uploadType === type ? " active" : ""}`}
                title={`Upload ${type}`} onClick={() => this.toggleUploadPanel(type)}>
                <Icon name={type} />
            </button>
        ));
    }

    renderAttachment(attachment) {
        if (!attachment) {
            return null;
        }
        return (
            <div className="side-panel-container">
                <button type="button" className="btn-icon create-side-panel-btn"
                    onClick={this.removeAttachment} title="Remove attachment">
                    <Icon name="remove" />
                </button>
                <Attachment {...attachment}></Attachment>
            </div>
        );
    }

    renderUploadPanel(uploadType, message) {
        return (
            <div className="side-panel-container">
                <div className="create-side-upload-item">
                    <div>Upload {uploadType} from device</div>
                    <label className="btn" tabIndex="0">
                        <span>Upload</span>
                        <input type="file" className="file-input" onChange={this.handleFileUpload} />
                    </label>
                </div>
                <div className="create-side-upload-item">
                    <div>Upload {uploadType} from url</div>
                    <form onSubmit={this.handleFileUploadFormURL}>
                        <input type="text" name="url" className="input" />
                        <button className="btn">Upload</button>
                    </form>
                </div>
                {message && <div className="create-side-upload-panel-message">{message}</div>}
                <button type="button" className="btn-icon create-side-panel-btn"
                    onClick={this.closeUploadPanel} title="Close panel">
                    <Icon name="close" />
                </button>
            </div>
        );
    }

    render() {
        const { card, uploadType, isUploadPanelVisible } = this.state;
        const { attachment, panelMessage, text, textSize } = card[this.side];

        return (
            <div className={`side-container${card.visibleSide === this.side ? " visible" : ""}`}>
                <div className="side-name">{this.side}</div>
                <div className="side">
                    <div className="create-side-toolbar">
                        {this.renderToolbarBtns(uploadType)}
                        <TextSizeSelect textSize={textSize}
                            handleTextSizeSelect={this.handleTextSizeSelect} />
                    </div>
                    <div className="side-content create-side-content">
                        {isUploadPanelVisible ?
                            this.renderUploadPanel(uploadType, panelMessage) :
                            this.renderAttachment(attachment)
                        }
                        <textarea className="input create-side-text-input side-text"
                            defaultValue={text}
                            style={{ fontSize: `${textSize}px` }}
                            onInput={this.handleInput}></textarea>
                    </div>
                </div>
            </div>
        );
    }
}
