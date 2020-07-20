import React, { useState } from "react";
import TextSizeSelect from "../TextSizeSelect";
import UploadPanel from "./UploadPanel";
import Attachment from "./CreateCardAttachment";
import Icon from "../../Icon";

export default function CreateCardFront({ side, addAttachment, removeAttachment, updateAttachmentDescription, handleChange }) {
  const [type, setType] = useState("text");
  const { text, textSize, attachment } = side;

  function handleTypeChange({ target }) {
    setType(target.value);
  }

  function showErrorMessage() {
    const errors = side.errors;

    if (errors?.attachmentMessage) {
      return <div className="create-side-message">{errors.attachmentMessage}</div>;
    }
    else if (errors?.textMessage) {
      return <div className="create-side-message">{errors.textMessage}</div>;
    }
    return null;
  }

  return (
    <div className="create-card-side">
      <div className="create-side-toolbar">
        <ul className="create-side-types">
          <li className="create-side-type">
            <label>
              <input type="radio" className="sr-only create-type-radio"
                value="text"
                checked={type === "text"}
                onChange={handleTypeChange}/>
              <Icon name="text" title="Text" className="create-option-type-icon"/>
            </label>
          </li>
          <li className="create-side-type">
            <label>
              <input type="radio" className="sr-only create-type-radio"
                value="attachment"
                checked={type === "attachment"}
                onChange={handleTypeChange}/>
              <Icon name="attachment" title="Attachment" className="create-option-type-icon"/>
            </label>
          </li>
        </ul>
        {type === "text" && <TextSizeSelect
          textSize={textSize}
          handleChange={event => handleChange(event, "front", "textSize")}/>}
      </div>
      {type === "text" ? (
        <div className="create-side-content create-front-side-content">
          <textarea className="input create-side-text-input"
            value={text}
            style={{ fontSize: `${textSize}px` }}
            onChange={event => handleChange(event, "front", "text")}></textarea>
          {showErrorMessage()}
        </div>
      ) : (
        <div className="create-side-content create-front-side-content">
          {attachment ? (
            <>
              <div className="create-side-panel">
                <button type="button" className="btn btn-icon create-side-panel-btn"
                  onClick={removeAttachment} title="Remove attachment">
                  <Icon name="remove"/>
                </button>
                <Attachment attachment={attachment}/>
                {side.errors?.attachmentMessage && (
                  <div className="create-side-attachment-message">{side.errors.attachmentMessage}</div>
                )}
              </div>
              <input type="text"
                className="input create-side-attachment-input"
                placeholder="Describe attachment"
                defaultValue={attachment.description}
                onChange={updateAttachmentDescription}/>
            </>
          ) : (
            <UploadPanel addAttachment={addAttachment}/>
          )}
        </div>
      )}
    </div>
  );
}
