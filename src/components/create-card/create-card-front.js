import React from "react";
import TextSizeSelect from "./create-card-text-size-select";
import UploadPanel from "./create-card-upload-panel";
import Attachment from "../attachment";
import Icon from "../icon";

export default class CreateCardFrontSide extends React.Component {
    state = { card: this.props.card };
    side = "front";

    removeAttachment = () => {
        const { card } = this.state;

        delete card[this.side].attachment;
        this.setState({ card });
    }

    addAttachment = (file, type) => {
        const { card } = this.state;
        card[this.side].attachment = { file, type };

        this.setState({
            card,
            isUploadPanelVisible: false,
            type: ""
        });
    }

    showUploadPanel = type => {
        this.setState({
            isUploadPanelVisible: true,
            type
        });
    }

    hideUploadPanel = () => {
        this.setState({
            isUploadPanelVisible: false,
            type: ""
        });
    }

    renderToolbarBtns() {
        return ["image", "audio"].map((type, index) => (
            <button key={index}
                className="btn-icon toolbar-btn"
                title={`Upload ${type}`} onClick={() => this.showUploadPanel(type)}>
                <Icon name={type} />
            </button>
        ));
    }

    renderAttachment(attachment) {
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

    render() {
        const { card, type, isUploadPanelVisible } = this.state;
        const { attachment, text, textSize } = card[this.side];

        return (
            <React.Fragment>
                <div className={`side-container${this.props.card.visibleSide === this.side ? " visible" : ""}`}>
                    <div className="side-name">{this.side}</div>
                    <div className="side">
                        <div className="create-side-toolbar">
                            {this.renderToolbarBtns()}
                            <TextSizeSelect
                                sideName={this.side}
                                textSize={textSize}
                                handleTextSizeSelect={this.props.handleTextSizeSelect} />
                        </div>
                        <div className="side-content create-side-content">
                            {attachment && this.renderAttachment(attachment)}
                            <textarea className="input create-side-text-input side-text"
                                name={this.side}
                                value={text}
                                style={{ fontSize: `${textSize}px` }}
                                onChange={this.props.handleChange}></textarea>
                        </div>
                    </div>
                </div>
                {isUploadPanelVisible &&
                    <UploadPanel
                        type={type}
                        hide={this.hideUploadPanel}
                        addAttachment={this.addAttachment} />
                }
            </React.Fragment>
        );
    }
}
