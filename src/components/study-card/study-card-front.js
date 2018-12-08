import React from "react";
import Attachment from "../attachment";

export default class StudyCardFront extends React.Component {
    constructor(props) {
        super(props);

        this.sideName = "front";
        this.state = {};
    }

    showImage = () => {
        const { file, type } = this.props.card[this.sideName].attachment;

        if (type !== "image") {
            return;
        }
        this.setState({
            imageExpanded: true,
            imageSrc: typeof file === "string" ? file : URL.createObjectURL(file)
        });
    }

    hideExpandedImage = ({ target, currentTarget }) => {
        if (target === currentTarget) {
            this.setState({ imageExpanded: false });
        }
    }

    render() {
        const { card } = this.props;
        const { visibleSide } = card;
        const { attachment, text, textSize } = card[this.sideName];

        return (
            <React.Fragment>
                <div className={`side-container${visibleSide === this.sideName ? " visible" : ""}`}>
                    <div className="side-name">{this.sideName}</div>
                    <div className="side">
                        <div className="study-side-content">
                            {attachment && (
                                <div className={`side-panel-container${text ? "" : " full"}`}
                                    onClick={this.showImage}>
                                    <Attachment {...attachment}></Attachment>
                                </div>
                            )}
                            {text && (
                                <div className="side-text study-side-text">
                                    <div style={{ fontSize: `${textSize}px` }}>{text}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {this.state.imageExpanded && (
                    <div className="mask" onClick={this.hideExpandedImage}>
                        <img src={this.state.imageSrc} className="study-expaned-image" alt="" />
                    </div>
                )}
            </React.Fragment>
        );
    }
}
