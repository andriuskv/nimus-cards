import React, { useState } from "react";
import { useStore } from "../../../../context/CreateDeckContext";
import TextSizeSelect from "../TextSizeSelect";
import UploadPanel from "./UploadPanel";
import Attachment from "./CreateCardAttachment";
import Icon from "../../../Icon";

export default function CreateCardFront({ index, side, handleChange }) {
  const { dispatch } = useStore();
  const [uploadPanelVisible, setUploadPanelVisibility] = useState(false);
  const { text, textSize, attachment } = side;

  function addAttachment(attachment) {
    dispatch({
      type: "ADD_ATTACHMENT",
      index,
      attachment
    });
    hideUploadPanel();
  }

  function removeAttachment() {
    dispatch({ type: "REMOVE_ATTACHMENT", index });
  }

  function showUploadPanel() {
    setUploadPanelVisibility(true);
  }

  function hideUploadPanel() {
    setUploadPanelVisibility(false);
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
    <>
      <div>
        <div className="deck-form-field-title">FRONT</div>
        <div className="create-side-toolbar">
          <button className="btn btn-icon toolbar-btn"
            title="Add attachment" onClick={showUploadPanel}>
            <Icon name="add-file"/>
          </button>
          <TextSizeSelect
            textSize={textSize}
            handleChange={event => handleChange(event, "front", "textSize")}/>
        </div>
        <div className="create-side-content">
          {attachment && renderAttachment()}
          <textarea className="input create-side-text-input"
            value={text}
            style={{ fontSize: `${textSize}px` }}
            onChange={event => handleChange(event, "front", "text")}></textarea>
        </div>
      </div>
      {uploadPanelVisible && <UploadPanel hide={hideUploadPanel} addAttachment={addAttachment}/>}
    </>
  );
}
