import React, { useState } from "react";
import "./upload-panel.scss";
import Icon from "../../../Icon";

export default function UploadPanel({ addAttachment, errorMessage }) {
  const [message, setMessage] = useState("");
  const [visibleType, setVisibleType] = useState("image");

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
    showMessage(`Selected file is not ${visibleType[0] === "v" ? "a" : "an"} ${visibleType} file.`);
  }

  function handleFileUploadFormURL(event) {
    const url = event.target.elements.url.value.trim();

    event.preventDefault();

    if (!url) {
      showMessage(`Please specify valid url.`);
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
        showInvalidFileMessage();
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
        showInvalidFileMessage();
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
        showInvalidFileMessage();
        console.log(event);
      };

      video.src = url;
    }
  }

  function showInvalidFileMessage() {
    showMessage(`URL does not contain valid ${visibleType} file.`);
  }

  function renderTypeSelection() {
    return (
      <div className="upload-type-selection">
        {["image", "audio", "video"].map((type, index) => (
          <button className={`btn btn-icon-text upload-type-selection-btn${visibleType === type ? " active" : ""}`}
            onClick={() => setVisibleType(type)} key={index}>
            <Icon name={`${type}-file`}/>
            <span>{type}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="upload-panel">
      {renderTypeSelection()}
      <div className="upload-panel-content">
        <label className="btn upload-panel-import-input-container">
          <span>Select File</span>
          <input type="file" className="sr-only" onChange={handleFileUpload}/>
        </label>
        <div className="upload-panel-item-separator">OR</div>
        {message && <div className="upload-panel-message">{message}</div>}
        <form onSubmit={handleFileUploadFormURL} className="upload-panel-form">
          <input type="text" name="url" className="input upload-panel-form-input" placeholder="Enter URL..."/>
          <button className="btn upload-panel-form-btn">Upload</button>
        </form>
      </div>
      {errorMessage && <div className="create-side-message">{errorMessage}</div>}
    </div>
  );
}
