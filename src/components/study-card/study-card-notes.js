import React from "react";

export default function StudyCardNotes({ notes, toggleNotes }) {
    if (notes && notes.value) {
        return (
            <div className="study-notes-container">
                <button className="btn btn-text study-notes-toggle-btn" onClick={toggleNotes}>Notes</button>
                {notes.visible && <div className="study-card-content study-notes">{notes.value}</div>}
            </div>
        );
    }
    return null;
}
