import React from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import Dropdown from "../Dropdown";

export default function Deck({ deck, showDialog, showDeckSettings, exportDeck }) {
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
          <button className="btn btn-icon dropdown-btn" onClick={() => showDeckSettings(deck)}>
            <Icon name="settings"/>
            <span>Settings</span>
          </button>
          <Link to={`/decks/${deck.id}`} className="btn btn-icon dropdown-btn">
            <Icon name="list"/>
            <span>Status</span>
          </Link>
          <Link to={`/decks/${deck.id}/edit`} className="btn btn-icon dropdown-btn">
            <Icon name="edit"/>
            <span>Edit</span>
          </Link>
          <button className="btn btn-icon dropdown-btn" onClick={() => exportDeck(deck)}>
            <Icon name="export"/>
            <span>Export</span>
          </button>
          <button className="btn btn-icon dropdown-btn" onClick={() => showDialog(deck.id)}>
            <Icon name="remove"/>
            <span>Remove</span>
          </button>
        </Dropdown>
      </div>
      <div className="deck-btn-container">
        {deck.hasCardsToLearn ? (
          <Link to={`/decks/${deck.id}/learn`} className="btn btn-text deck-btn">Learn</Link>
        ) : <span className="btn btn-text deck-btn disabled">Learn</span>}
        {deck.hasCardsToReview ? (
          <Link to={`/decks/${deck.id}/review`} className="btn btn-text deck-btn">Review</Link>
        ) : <span className="btn btn-text deck-btn disabled">Review</span>}
        <Link to={`/decks/${deck.id}/practice`} className="btn btn-text deck-btn">Practice</Link>
      </div>
    </li>
  );
}
