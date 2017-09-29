import React from "react";
import CardBack from "../components/create-card-back";

export default class CreateCardSideContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            card: props.card,
            side: "back"
        };
    }

    render() {
        return <CardBack {...this.state}
            handleTextSizeSelect={this.props.handleTextSizeSelect}
            handleInput={this.props.handleInput} />;
    }
}
