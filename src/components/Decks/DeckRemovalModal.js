import React from "react";
import Modal from "../Modal";

export default function DeckRemovalModal({ removeDeck, cancelRemoval }) {
  return (
    <Modal hide={cancelRemoval}>
      <h3 className="modal-title">Are you sure you want to remove this deck?</h3>
      <div className="deck-dialog-box-btns">
        <button className="btn btn-danger" onClick={removeDeck}>Remove</button>
        <button className="btn btn-text" onClick={cancelRemoval}>Cancel</button>
      </div>
    </Modal>
  );
}
