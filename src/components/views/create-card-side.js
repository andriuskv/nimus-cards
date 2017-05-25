import React from "react";
import Icon from "./icon";

export default class CreateCardSide extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            card: props.card
        };
    }

    hasSideContent(side) {
        return side.text || side.image;
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

    setSideText = element => {
        if (element && !element.rendered) {
            element.textContent = this.props.card[this.props.side].text;
            element.rendered = true;
        }
    }

    removeImage = () => {
        const card = Object.assign({}, this.state.card);
        const side = card[this.props.side];

        delete side.image;
        this.setState({ card });
    }

    render() {
        const { index, side, handleImageUpload } = this.props;

        return (
            <div className={`side-container${this.state.card.visibleSide === side ? " visible": ""}`}>
                <span className="side-name">{side}</span>
                <div className="side">
                    <div className="create-side-toolbox">
                        <label className="btn-icon" tabIndex="0" title="Upload image">
                            <Icon name="image" />
                            <input type="file" className="image-upload-input"
                                onChange={(event) => handleImageUpload(index, side, event.target.files[0])} />
                        </label>
                    </div>
                    <div className="side-content create-side-content">
                        {this.state.card[side].image && (
                            <div className="side-image-container">
                                <img src={URL.createObjectURL(this.state.card[side].image)} alt="" className="side-image" />
                                <button type="button" className="btn-icon create-side-image-btn" onClick={this.removeImage} title="Remove image">
                                    <Icon name="remove" />
                                </button>
                            </div>
                        )}
                        <div id={`${side}-${index}`} className="side-text" ref={this.setSideText}
                            contentEditable></div>
                    </div>
                    {this.renderMessage()}
                </div>
            </div>
        );
    }
}
