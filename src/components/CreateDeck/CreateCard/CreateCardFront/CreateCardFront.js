import React, { useState } from "react";
import { useStore } from "../../../../context/CreateDeckContext";
import TextSizeSelect from "../TextSizeSelect";
import UploadPanel from "./UploadPanel";
import Attachment from "./CreateCardAttachment";
import Icon from "../../../Icon";

export default function CreateCardFront({ index, side, handleChange }) {
  const { dispatch } = useStore();
  const [type, setType] = useState("text");
  const { text, textSize, attachment } = side;

  function addAttachment(attachment) {
    dispatch({
      type: "ADD_ATTACHMENT",
      index,
      attachment
    });
  }

  function removeAttachment() {
    dispatch({ type: "REMOVE_ATTACHMENT", index });
  }

  function updateAttachmentDescription({ target }) {
    dispatch({
      type: "UPDATE_ATTACHMENT_DESCRIPTION",
      index,
      description: target.value
    });
  }

  function handleTypeChange({ target }) {
    setType(target.value);
  }

  function renderAttachment() {
    return (
      <div className="create-side-panel">
        <button type="button" className="btn btn-icon create-side-panel-btn"
          onClick={removeAttachment} title="Remove attachment">
          <Icon name="remove"/>
        </button>
        <Attachment {...attachment}/>
      </div>
    );
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
        <div className="create-side-content ab">
          <textarea className="input create-side-text-input"
            value={text}
            style={{ fontSize: `${textSize}px` }}
            onChange={event => handleChange(event, "front", "text")}></textarea>
        </div>
      ) : (
        <div className="create-side-content ab">
          {attachment ? (
            <>
              {renderAttachment()}
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
