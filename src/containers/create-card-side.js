import React from "react";
import Icon from "../components/icon";

export default class CreateCardSide extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            card: props.card
        };
    }

    hasSideContent(side) {
        return side.text || side.attachment;
    }

    renderMessage() {
        const { card, side, oppositeSide } = this.props;
        const isCurrentSideEmpty = !this.hasSideContent(card[side]) && this.hasSideContent(card[oppositeSide]);
        const isOppositeSideEmpty = !this.hasSideContent(card[oppositeSide]) && this.hasSideContent(card[side]);
        let message = "";

        if (isCurrentSideEmpty) {
            message = `Please fill in card ${side}`;
        }
        else if (isOppositeSideEmpty && window.innerWidth <= 600) {
            const capitalizedName = oppositeSide.charAt(0).toUpperCase() + oppositeSide.slice(1);
            message = `${capitalizedName} side is empty`;
        }
        else {
            return null;
        }
        return <div className="create-side-message">{message}</div>;
    }

    removeAttachment = () => {
        const card = Object.assign({}, this.state.card);
        const side = card[this.props.side];

        delete side.attachment;
        this.setState({ card });
    }

    renderUploadBtn(index, side, type) {
        return (
            <label className="btn-icon" tabIndex="0" title={`Upload ${type}`}>
                <Icon name={type} />
                <input type="file" className="file-input"
                    onChange={({ target }) => this.props.handleFileUpload(target, index, side, type)} />
            </label>
        );
    }

    renderAttachment(attachment) {
        if (!attachment) {
            return null;
        }
        const src = URL.createObjectURL(attachment.file);
        let element = null;

        if (attachment.type === "image") {
            element = <img src={src} alt="" className="side-image" />;
        }
        else if (attachment.type === "audio") {
            element = <audio src={src} className="side-audio" controls></audio>;
        }

        return (
            <div className="side-attachment-container">
                <button type="button" className="btn-icon create-side-attachment-btn"
                    onClick={this.removeAttachment} title="Remove attachment">
                    <Icon name="remove" />
                </button>
                {element}
            </div>
        );
    }

    render() {
        const { index, card, side } = this.props;
        const toolboxMessage = card[side].toolboxMessage;

        return (
            <div className={`side-container${card.visibleSide === side ? " visible": ""}`}>
                <span className="side-name">{side}</span>
                <div className="side">
                    <div className="create-side-toolbox">
                        {this.renderUploadBtn(index, side, "image")}
                        {this.renderUploadBtn(index, side, "audio")}
                        {toolboxMessage && <div className="create-side-toolbox-mesasge">{toolboxMessage}</div>}
                    </div>
                    <div className="side-content create-side-content">
                        {this.renderAttachment(card[side].attachment)}
                        <textarea id={`${side}-${index}`} className="create-side-text-input side-text"
                            defaultValue={card[side].text}></textarea>
                    </div>
                    {this.renderMessage()}
                </div>
            </div>
        );
    }
}
