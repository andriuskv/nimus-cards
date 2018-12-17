import React from "react";
import TextSizeSelect from "./create-card-text-size-select";

export default class CreateCardBackSide extends React.Component {
    side = "back";

    render() {
        const { card, handleChange, handleTextSizeSelect } = this.props;
        const { text, textSize } = card[this.side];

        return (
            <div className={`side-container${card.visibleSide === this.side ? " visible" : ""}`}>
                <div className="side-name">{this.side}</div>
                <div className="side">
                    <div className="create-side-toolbar">
                        <TextSizeSelect
                            sideName={this.side}
                            textSize={textSize}
                            handleTextSizeSelect={handleTextSizeSelect} />
                    </div>
                    <div className="side-content create-side-content">
                        <textarea className="input create-side-text-input side-text"
                            name={this.side}
                            value={text}
                            style={{ fontSize: `${textSize}px` }}
                            onChange={handleChange}></textarea>
                    </div>
                </div>
            </div>
        );
    }
}
