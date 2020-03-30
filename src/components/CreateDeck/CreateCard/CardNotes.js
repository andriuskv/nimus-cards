import React from "react";

export default function CreateCardNotes({ value, handleChange }) {
    return (
        <div className="deck-form-card-notes-container">
            <div className="deck-form-field-title">NOTES</div>
            <textarea className="input deck-form-card-notes-input"
                value={value}
                onChange={event => handleChange(event, "notes", "value")}
            ></textarea>
        </div>
    );
}
