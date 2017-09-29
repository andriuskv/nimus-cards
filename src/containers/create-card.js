import React from "react";
import Icon from "../components/icon";
import CardFront from "./create-card-front";
import CardBack from "./create-card-back";

export default class CreateCardContainer extends React.Component {
    constructor(props) {
        super(props);

        props.card.visibleSide = "front";
        this.state = {
            card: props.card
        };
    }

    getOppositeSide(side) {
        return side === "front" ? "back" : "front";
    }

    switchSide = side => {
        const card = this.state.card;
        card.visibleSide = this.getOppositeSide(side);

        this.setState({ card });
    }

    handleInput = ({ target: { value } }, side) => {
        const { card } = this.state;

        if (value !== card[side].text) {
            card[side].text = value;
            this.setState({ card });
        }
    }

    handleTextSizeSelect = ({ target: { value } }, side) => {
        const { card } = this.state;

        card[side].textSize = value;
        this.setState({ card });
    }

    render() {
        const { index, removeCard } = this.props;
        const side = this.state.card.visibleSide;
        const oppositeSide = this.getOppositeSide(side);

        return (
            <li className="create-list-item">
                <div className="create-card-header">
                    <div className="create-card-index">{index + 1}.</div>
                    <button type="button" className="btn-icon switch-side-btn"
                        title={`Switch to ${oppositeSide} side`}
                        onClick={() => this.switchSide(side)}>
                        <Icon name="switch" />
                    </button>
                    {this.props.cardCount > 1 && (
                        <button type="button" className="btn-icon" title="Remove card" onClick={() => removeCard(index)}>
                            <Icon name="remove" />
                        </button>
                    )}
                </div>
                <div className="create-card">
                    <CardFront
                        card={this.state.card}
                        handleInput={this.handleInput}
                        handleTextSizeSelect={this.handleTextSizeSelect} />
                    <CardBack
                        card={this.state.card}
                        handleInput={this.handleInput}
                        handleTextSizeSelect={this.handleTextSizeSelect} />
                </div>
            </li>
        );
    }
}
