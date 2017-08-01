import React from "react";
import CardSide from "../components/create-card-side";

export default class CreateCardSideContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            side: props.side,
            card: props.card
        };
    }

    removeAttachment = () => {
        const { card, side } = this.state;

        delete card[side].attachment;
        this.setState({ card });
    }

    handleInput = ({ target: { value } }) => {
        const { card, side } = this.state;

        if (value !== card[side].text) {
            card[side].text = value;
            this.setState({ card });
        }
    }

    showUploadPanelMessage(message) {
        const { card, side } = this.state;
        card[side].panelMessage = message;

        this.setState({ card });

        setTimeout(() => {
            card[side].panelMessage = "";
            this.setState({ card });
        }, 3200);
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
        const { card, side } = this.state;
        card[side].attachment = Object.assign({}, { file, type });

        this.setState({
            card,
            isUploadPanelVisible: false,
            uploadType: ""
        });
    }

    handleFileUploadFormURL = (event) => {
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

    handleTextSizeSelect = event => {
        const { card, side } = this.state;

        card[side].textSize = event.target.value;
        this.setState({ card });
    }

    showUploadPanel = type => {
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

    render() {
        return <CardSide {...this.state}
            handleTextSizeSelect={this.handleTextSizeSelect}
            handleInput={this.handleInput}
            removeAttachment={this.removeAttachment}
            showUploadPanel={this.showUploadPanel}
            closeUploadPanel={this.closeUploadPanel}
            handleFileUpload={this.handleFileUpload}
            handleFileUploadFormURL={this.handleFileUploadFormURL} />;
    }
}
