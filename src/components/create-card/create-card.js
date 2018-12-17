import React from "react";
import Icon from "../icon";
import CardFront from "./create-card-front";
import CardBack from "./create-card-back";

export default class CreateCard extends React.Component {
    state = {
        ...this.props.card,
        visibleSide: "front"
    };

    flipSide = () => {
        const { visibleSide } = this.state;

        this.setState({
            visibleSide: visibleSide === "front" ? "back" : "front"
        });
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        const side = this.state[name];

        if (value !== side.text) {
            side.text = value;
            this.setState({ [name]: side });
        }
    }

    handleTextSizeSelect = ({ target }) => {
        const { name, value } = target;
        const side = this.state[name];

        side.textSize = value;
        this.setState({ [name]: side });
    }

    render() {
        const { index, removeCard } = this.props;

        return (
            <li className="create-list-item">
                <div className="create-card-index">{index + 1}.</div>
                <div className="create-input-group create-card">
                    <CardFront
                        card={this.state}
                        handleChange={this.handleChange}
                        handleTextSizeSelect={this.handleTextSizeSelect} />
                    <CardBack
                        card={this.state}
                        handleChange={this.handleChange}
                        handleTextSizeSelect={this.handleTextSizeSelect} />
                </div>
                <div className="create-card-btns">
                    <button className="btn-icon create-card-flip-btn" title="Flip side"
                        onClick={this.flipSide}>
                        <Icon name="flip" />
                    </button>
                    <button className="btn-icon"
                        title="Remove card"
                        onClick={() => removeCard(index)}>
                        <Icon name="remove" />
                    </button>
                </div>
            </li>
        );
    }
}
