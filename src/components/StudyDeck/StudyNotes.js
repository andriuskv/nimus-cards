import React, { useState } from "react";

export default function StudyNotes({ notes }) {
  const [notesVisible, setNoteVisibility] = useState(false);

  function toggleNotes() {
    setNoteVisibility(!notesVisible);
  }

  return (
    <div>
      <div className="study-notes-toggle-btn-container">
        <button className="btn btn-text" onClick={toggleNotes}>Notes</button>
      </div>
      {notesVisible && <div className="study-notes">{notes.value}</div>}
    </div>
  );
}
