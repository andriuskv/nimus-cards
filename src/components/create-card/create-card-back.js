import React from "react";
import TextSizeSelect from "./create-card-text-size-select";

export default class CreateCardBackSide extends React.Component {
    constructor(props) {
        super(props);

        this.side = "back";
    }

    handleTextSizeSelect = event => {
        this.props.handleTextSizeSelect(event, this.side);
    }

    handleInput = event => {
        this.props.handleInput(event, this.side);
    }

    render() {
        const { card } = this.props;
        const { text, textSize } = card[this.side];

        return (
            <div className={`side-container${card.visibleSide === this.side ? " visible" : ""}`}>
                <div className="side-name">{this.side}</div>
                <div className="side">
                    <div className="create-side-toolbar">
                        <TextSizeSelect textSize={textSize}
                            handleTextSizeSelect={this.handleTextSizeSelect} />
                    </div>
                    <div className="side-content create-side-content">
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
