import React, { useState } from "react";
import "./upload-panel.scss";
import Modal from "../../../../Modal";
import Icon from "../../../../Icon";

export default function UploadPanel({ hide, addAttachment }) {
  const [message, setMessage] = useState("");
  const [visibleType, setVisibleType] = useState("");

  function showMessage(message) {
    setMessage(message);

    setTimeout(() => {
      setMessage("");
    }, 3200);
  }

  function handleFileUpload({ target }) {
    const [file] = target.files;

    target.value = "";

    if (file.type.split("/")[0] === visibleType) {
      addAttachment({
        blob: file,
        type: visibleType
      });
      return;
    }
    showMessage(`File is not an ${visibleType}`);
  }

  function handleFileUploadFormURL(event) {
    const url = event.target.elements.url.value.trim();

    event.preventDefault();

    if (!url) {
      showMessage(`Please specify valid url`);
      return;
    }

    if (visibleType === "image") {
      const image = new Image();

      image.onload = () => {
        addAttachment({
          url,
          type: visibleType
        });
      };

      image.onerror = event => {
        showMessage(`URL doesn't contain ${visibleType} file`);
        console.log(event);
      };

      image.src = url;
    }
    else if (visibleType === "audio") {
      const audio = new Audio(url);

      audio.onloadedmetadata = () => {
        addAttachment({
          url,
          type: visibleType
        });
      };

      audio.onerror = event => {
        showMessage(`URL doesn't contain ${visibleType} file`);
        console.log(event);
      };
    }
    else if (visibleType === "video") {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";

      video.onloadedmetadata = () => {
        addAttachment({
          url,
          type: visibleType
        });
      };

      video.onerror = event => {
        showMessage(`URL doesn't contain ${visibleType} file`);
        console.log(event);
      };

      video.src = url;
    }
  }

  function renderTypeSelection() {
    return (
      <div className="upload-type-selection">
        {["image", "audio", "video"].map((type, index) => (
          <button className={`btn btn-icon upload-type-selection-btn${visibleType === type ? " active" : ""}`}
            onClick={() => setVisibleType(type)} key={index}>
            <Icon name={`${type}-file`}/>
            <span>{type}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <Modal className="upload-panel" hide={hide}>
      <h3 className="modal-title">Add Attachment</h3>
      {renderTypeSelection()}
      {visibleType && (
        <>
          <div className="upload-panel-device-target">
            <div className="upload-panel-device-target-title">Select {visibleType} file from device</div>
            <label className="btn upload-panel-import-input-container">
              <span>Select File</span>
              <input type="file" className="sr-only" onChange={handleFileUpload} />
            </label>
          </div>
          <div className="upload-panel-item-separator">Or</div>
          <div className="upload-panel-url-target">
            <div className="upload-panel-url-target-title">Upload {visibleType} file from URL</div>
            <form onSubmit={handleFileUploadFormURL} className="upload-panel-form">
              <input type="text" name="url" className="input upload-panel-url-target-input" />
              <button className="btn">Upload</button>
            </form>
          </div>
          <div className="upload-panel-footer">
            {message && <div className="upload-panel-message">{message}</div>}
            <button type="button" className="btn btn-text" onClick={hide}>Cancel</button>
          </div>
        </>
      )}
    </Modal>
  );
}
