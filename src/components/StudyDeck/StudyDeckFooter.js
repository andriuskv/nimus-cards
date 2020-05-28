import React, { useState } from "react";

export default function StudyDeckFooter({ notes, handleStudyExit }) {
  const [notesVisible, setNoteVisibility] = useState(false);

  function toggleNotes() {
    setNoteVisibility(!notesVisible);
  }

  return (
    <div className="study-footer">
      <div className="study-footer-btns">
        {notes?.value && (
          <button className="btn btn-text study-footer-btn" onClick={toggleNotes}>Notes</button>
        )}
        <button className="btn btn-text study-footer-btn study-exit-btn" onClick={handleStudyExit}>Exit</button>
      </div>
      {notesVisible && <div className="study-card-notes">{notes.value}</div>}
    </div>
  );
}
