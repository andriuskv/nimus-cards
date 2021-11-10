import "./settings.scss";
import Modal from "../../Modal";

export default function Settings({ children, hide }) {
  return (
    <Modal hide={hide}>
      {children}
      <div className="decks-settings-footer">
        <button className="btn btn-text decks-settings-hide-btn" onClick={hide}>Close</button>
      </div>
    </Modal>
  );
}
