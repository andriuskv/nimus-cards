import React from "react";
import "./create-card-preview.scss";
import Card from "../../StudyDeck/StudyCard";
import Modal from "../../Modal";

export default function CreateCardPreview({ card, hide }) {
  return (
    <Modal className="container create-card-preview-modal" hide={hide}>
      <h3 className="modal-title">Card Preview</h3>
      <Card card={card}
        selectOption={hide}
        revealAnswer={hide}
        nextStep={hide}/>
    </Modal>
  );
}
