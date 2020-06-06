import React from "react";

export default function CreateCardNotes({ value, handleChange }) {
  return (
    <div className="deck-form-card-notes-container">
      <textarea className="input deck-form-card-notes-input"
        placeholder="Notes..."
        value={value}
        onChange={event => handleChange(event, "notes", "value")}
      ></textarea>
    </div>
  );
}
