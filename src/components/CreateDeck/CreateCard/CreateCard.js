import React, { useState } from "react";
import { useStore } from "../../../context/CreateDeckContext";
import Icon from "../../Icon";
import CardFront from "./CreateCardFront";
import CardBack from "./CreateCardBack";
import CardNotes from "./CardNotes";
import CreateCardPreview from "./CreateCardPreview";

export default function CreateCard({ index, card, length, previewCard, cloneCard, swapCard, removeCard }) {
  const { state, dispatch } = useStore();
  const [notesVisible, setNotesVisibility] = useState(card.notes && !!card.notes.value);

  function toggleNotes() {
    setNotesVisibility(!notesVisible);
  }

  function handleChange({ target }, name, key) {
    const { value } = target;

    if (value !== card[name][key]) {
      dispatch({
        type: "UPDATE_CARD_VALUE",
        index,
        name,
        key,
        value
      });
    }
  }

  function hidePreview() {
    dispatch({ type: "HIDE_PREVIEW_CARD", card });
  }

  return (
    <li className="create-list-item">
      <div className="create-card-left">
        {index > 0 && (
          <button className="btn btn-icon" onClick={() => swapCard(index, -1)} title="Move card up">
            <Icon name="chevron-up"/>
          </button>
        )}
        <div className="create-card-index">{index + 1}</div>
        {index < length - 1 && (
          <button className="btn btn-icon" onClick={() => swapCard(index, 1)} title="Move card down">
            <Icon name="chevron-down"/>
          </button>
        )}
      </div>
      <div className="deck-form-field-group create-card">
        <CardFront index={index} side={card.front} handleChange={handleChange}/>
        <CardBack index={index}/>
        {notesVisible && <CardNotes value={card.notes.value} handleChange={handleChange}/>}
      </div>
      <div className="create-card-btns">
        <button className="btn btn-icon" title="Toggle notes" onClick={toggleNotes}>
          <Icon name="notes"/>
        </button>
        <div className="create-card-preview-btn-container">
          <button className="btn btn-icon" title="Preview card" onClick={() => previewCard(card)}>
            <Icon name="preview"/>
          </button>
          {card.message && <p className="create-card-preview-message">{card.message}</p>}
        </div>
        <button className="btn btn-icon" title="Clone card" onClick={() => cloneCard(index)}>
          <Icon name="clone"/>
        </button>
        {state.cards.length > 1 && (
          <button className="btn btn-icon" title="Remove card" onClick={() => removeCard(index)}>
            <Icon name="remove"/>
          </button>
        )}
      </div>
      {card.visible && <CreateCardPreview card={card} hide={hidePreview}/>}
    </li>
  );
}
