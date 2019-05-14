import React from "react";

export default class CreateCardUploadPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ""
        };
    }

    showMessage(message) {
        this.setState({ message });

        setTimeout(() => {
            this.setState({ message: "" });
        }, 3200);
    }

    hide = () => {
        this.props.hide();
    }

    handleFileUpload = ({ target }) => {
        const { type } = this.props;
        const [file] = target.files;

        target.value = "";

        if (file.type.split("/")[0] === type) {
            this.props.addAttachment(file, type);
            return;
        }
        this.showMessage(`File is not an ${type}`);
    }

    handleFileUploadFormURL = event => {
        const url = event.target.elements.url.value.trim();
        const { type } = this.props;

        event.preventDefault();

        if (!url) {
            this.showMessage(`Please specify valid url`);
            return;
        }

        if (type === "image") {
            const image = new Image();

            image.onload = () => {
                this.props.addAttachment(url, type);
            };

            image.onerror = event => {
                this.showMessage(`URL doesn't contain ${type} file`);
                console.log(event);
            };

            image.src = url;
        }
        else if (type === "audio") {
            const audio = new Audio(url);

            audio.onloadedmetadata = () => {
                this.props.addAttachment(url, type);
            };

            audio.onerror = event => {
                this.showMessage(`URL doesn't contain ${type} file`);
                console.log(event);
            };
        }
    }

    render() {
        const { type } = this.props;
        const { message } = this.state;

        return (
            <div className="mask">
                <div className="modal upload-panel">
                    <div className="upload-panel-device-target">
                        <div className="upload-panel-device-target-title">Select {type} file from device</div>
                        <label className="btn" tabIndex="0">
                            <span>Select</span>
                            <input type="file" className="file-input" onChange={this.handleFileUpload} />
                        </label>
                    </div>
                    <div className="upload-panel-item-separator">Or</div>
                    <div className="upload-panel-url-target">
                        <div className="upload-panel-url-target-title">Upload {type} from url</div>
                        <form onSubmit={this.handleFileUploadFormURL}>
                            <input type="text" name="url" className="input upload-panel-url-target-input" />
                            <button className="btn">Upload</button>
                        </form>
                    </div>
                    <div className="upload-panel-footer">
                        {message && <div className="upload-panel-message">{message}</div>}
                        <button type="button" className="btn btn-text" onClick={this.hide}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}
