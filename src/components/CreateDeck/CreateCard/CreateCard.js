import React from "react";
import "./create-card.scss";
import { useStore } from "../../../context/CreateDeckContext";
import Icon from "../../Icon";
import CardFront from "./CreateCardFront";
import CardBack from "./CreateCardBack";
import CardNotes from "./CardNotes";
import CreateCardPreview from "./CreateCardPreview";

export default function CreateCard({ index, card, length, previewCard, cloneCard, swapCard, removeCard }) {
  const { state, dispatch } = useStore();

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
    <div className="create-card">
      <div className="create-card-header">
        <div className="create-card-header-a">
          <button className="btn btn-icon" onClick={() => swapCard(index, -1)}
            title="Swap with the left card" disabled={index === 0}>
            <Icon name="chevron-left"/>
          </button>
          <div className="create-card-index">{index + 1}</div>
          <button className="btn btn-icon" onClick={() => swapCard(index, 1)}
            title="Swap with the right card" disabled={index === length - 1}>
            <Icon name="chevron-right"/>
          </button>
        </div>
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
      <div className="create-card-main">
        <CardFront index={index} side={card.front} handleChange={handleChange}/>
        <CardBack index={index}/>
      </div>
      <CardNotes value={card.notes.value} handleChange={handleChange}/>
      {card.visible && <CreateCardPreview card={card} hide={hidePreview}/>}
    </div>
  );
}
