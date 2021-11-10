import { useState } from "react";
import UploadPanel from "./UploadPanel";
import Attachment from "./CreateCardAttachment";
import Icon from "../../Icon";

export default function CreateCardFront({ side, addAttachment, removeAttachment, updateAttachmentDescription, handleChange }) {
  const { text, attachment } = side;
  const [type, setType] = useState(!text && attachment ? "attachment": "text");

  function handleTypeChange({ target }) {
    setType(target.value);
  }

  function showErrorMessage() {
    const { error } = side;

    if (error?.attachmentMessage) {
      return <div className="create-side-message">{error.attachmentMessage}</div>;
    }
    else if (error?.textMessage) {
      return <div className="create-side-message">{error.textMessage}</div>;
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
      </div>
      {type === "text" ? (
        <div className="create-side-content create-front-side-content">
          <textarea className="input create-side-text-input"
            value={text} onChange={handleChange}></textarea>
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
                {side.error?.attachmentMessage && (
                  <div className="create-side-attachment-message">{side.error.attachmentMessage}</div>
                )}
              </div>
              <input type="text"
                className="input create-side-attachment-input"
                placeholder="Describe attachment"
                defaultValue={attachment.description}
                onChange={updateAttachmentDescription}/>
            </>
          ) : (
            <UploadPanel addAttachment={addAttachment} errorMessage={side.error?.textMessage}/>
          )}
        </div>
      )}
    </div>
  );
}
