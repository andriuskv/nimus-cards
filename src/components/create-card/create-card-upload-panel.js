import React, { useState } from "react";

export default function CreateCardUploadPanel({ hide, type, addAttachment }) {
    const [message, setMessage] = useState("");

    function showMessage(message) {
        setMessage(message);

        setTimeout(() => {
            setMessage("");
        }, 3200);
    }

    function handleFileUpload({ target }) {
        const [file] = target.files;

        target.value = "";

        if (file.type.split("/")[0] === type) {
            addAttachment(file, type);
            return;
        }
        showMessage(`File is not an ${type}`);
    }

    function handleFileUploadFormURL(event) {
        const url = event.target.elements.url.value.trim();

        event.preventDefault();

        if (!url) {
            showMessage(`Please specify valid url`);
            return;
        }

        if (type === "image") {
            const image = new Image();

            image.onload = () => {
                addAttachment(url, type);
            };

            image.onerror = event => {
                showMessage(`URL doesn't contain ${type} file`);
                console.log(event);
            };

            image.src = url;
        }
        else if (type === "audio") {
            const audio = new Audio(url);

            audio.onloadedmetadata = () => {
                addAttachment(url, type);
            };

            audio.onerror = event => {
                showMessage(`URL doesn't contain ${type} file`);
                console.log(event);
            };
        }
    }

    return (
        <div className="mask">
            <div className="modal upload-panel">
                <div className="upload-panel-device-target">
                    <div className="upload-panel-device-target-title">Select {type} file from device</div>
                    <label className="btn" tabIndex="0">
                        <span>Select</span>
                        <input type="file" className="file-input" onChange={handleFileUpload} />
                    </label>
                </div>
                <div className="upload-panel-item-separator">Or</div>
                <div className="upload-panel-url-target">
                    <div className="upload-panel-url-target-title">Upload {type} from url</div>
                    <form onSubmit={handleFileUploadFormURL}>
                        <input type="text" name="url" className="input upload-panel-url-target-input" />
                        <button className="btn">Upload</button>
                    </form>
                </div>
                <div className="upload-panel-footer">
                    {message && <div className="upload-panel-message">{message}</div>}
                    <button type="button" className="btn btn-text" onClick={hide}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
