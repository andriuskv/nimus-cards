import React, { useState, useEffect } from "react";

export default function StudyCardNotes({ id, notes }) {
  const [notesVisible, setNoteVisibility] = useState(false);

  useEffect(() => {
    setNoteVisibility(false);
  }, [id]);

  function toggleNotes() {
    setNoteVisibility(!notesVisible);
  }

  if (notes && notes.value) {
    return (
      <div className="study-notes-container">
        <button className="btn btn-text study-notes-toggle-btn" onClick={toggleNotes}>Notes</button>
        {notesVisible && <div className="study-card-content study-notes">{notes.value}</div>}
      </div>
    );
  }
  return null;
}
