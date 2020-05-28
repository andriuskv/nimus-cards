import React from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import Dropdown from "../Dropdown";

export default function Deck({ deck, showDialog, exportDeck }) {
  return (
    <li className="deck">
      <div className="deck-info">
        <div>
          <h2 className="deck-title">{deck.title}</h2>
          {deck.description && <p className="deck-description">{deck.description}</p>}
          <div className="deck-card-count">
            {deck.cards.length} card{deck.cards.length > 1 && "s"}
          </div>
        </div>
        <Dropdown>
          <Link to={`/decks/${deck.id}/edit`} className="btn btn-icon dropdown-btn">
            <Icon name="edit"/>
            <span>Edit</span>
          </Link>
          <button className="btn btn-icon dropdown-btn" onClick={() => exportDeck(deck)}>
            <Icon name="export"/>
            <span>Export</span>
          </button>
          <button className="btn btn-icon dropdown-btn" onClick={() => showDialog(deck)}>
            <Icon name="remove"/>
            <span>Remove</span>
          </button>
        </Dropdown>
      </div>
      <div className="deck-btn-container">
        <Link to={`/decks/${deck.id}`} className="btn btn-text deck-btn">Practice</Link>
      </div>
    </li>
  );
}
