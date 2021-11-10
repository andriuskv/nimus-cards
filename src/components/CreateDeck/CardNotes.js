export default function CreateCardNotes({ value, handleChange }) {
  return (
    <div className="create-card-notes-container">
      <textarea className="input create-card-notes-input"
        placeholder="Notes..."
        value={value}
        onChange={event => handleChange(event, "notes", "value")}
      ></textarea>
    </div>
  );
}
