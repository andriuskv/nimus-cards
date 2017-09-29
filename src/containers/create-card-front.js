import React from "react";
import CardFront from "../components/create-card-front";

export default class CreateCardFrontContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            card: props.card,
            side: "front"
        };
    }

    removeAttachment = () => {
        const { card, side } = this.state;

        delete card[side].attachment;
        this.setState({ card });
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

    toggleUploadPanel = type => {
        if (type === this.state.uploadType) {
            this.closeUploadPanel();
            return;
        }
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
        return <CardFront {...this.state}
            handleTextSizeSelect={this.props.handleTextSizeSelect}
            handleInput={this.props.handleInput}
            removeAttachment={this.removeAttachment}
            toggleUploadPanel={this.toggleUploadPanel}
            closeUploadPanel={this.closeUploadPanel}
            handleFileUpload={this.handleFileUpload}
            handleFileUploadFormURL={this.handleFileUploadFormURL} />;
    }
}
