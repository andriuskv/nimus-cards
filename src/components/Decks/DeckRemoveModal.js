import React from "react";
import Modal from "../Modal";

export default function DeckRemoveModal({ removeDeck, cancelRemoval }) {
  return (
    <Modal hide={cancelRemoval}>
      <h3 className="modal-title">Are you sure you want to remove this deck?</h3>
      <div className="deck-remove-modal-footer">
        <button className="btn btn-text deck-remove-modal-cancel-btn" onClick={cancelRemoval}>Cancel</button>
        <button className="btn btn-negative btn-negative-text deck-remove-modal-confirm-btn" onClick={removeDeck}>Remove</button>
      </div>
    </Modal>
  );
}
