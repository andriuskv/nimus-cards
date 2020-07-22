import React from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import Dropdown from "../Dropdown";

export default function Deck({ deck, showDialog, showDeckSettings, exportDeck }) {
  function renderDateDiffString() {
    const verb = deck.modifiedAt ? "Modified" : "Created";
    const elapsed = Date.now() - (deck.modifiedAt || deck.createdAt);
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365.25;

    if (elapsed < minute) {
      return `${verb} just now`;
    }
    const getDateDiffString = getDateDiffStringFunc(elapsed, verb);

    if (elapsed < hour) {
      return getDateDiffString("minute", minute);
    }
    else if (elapsed < day) {
      return getDateDiffString("hour", hour);
    }
    else if (elapsed < month) {
      return getDateDiffString("day", day);
    }
    else if (elapsed < year) {
      return getDateDiffString("month", month);
    }
    return getDateDiffString("year", year);
  }

  function getDateDiffStringFunc(elapsed, verb) {
    return (unitName, unitValue) => {
      const value = Math.round(elapsed / unitValue);
      return `${verb} ${value} ${unitName}${value > 1 ? "s" : ""} ago`;
    };
  }

  return (
    <li className="deck">
      <div className="deck-body">
        <div>
          <h2 className="deck-title">{deck.title}</h2>
          {deck.description && <p className="deck-description">{deck.description}</p>}
          <div className="deck-info">
            <div className="deck-info-item">
              {deck.cards.length} card{deck.cards.length > 1 && "s"}
            </div>
            <div className="deck-info-item">{renderDateDiffString()}</div>
          </div>
        </div>
        <Dropdown>
          <button className="btn btn-icon-text dropdown-btn" onClick={() => showDeckSettings(deck)}>
            <Icon name="settings"/>
            <span>Settings</span>
          </button>
          <Link to={`/decks/${deck.id}`} className="btn btn-icon-text dropdown-btn">
            <Icon name="list"/>
            <span>Status</span>
          </Link>
          <Link to={`/decks/${deck.id}/edit`} className="btn btn-icon-text dropdown-btn">
            <Icon name="edit"/>
            <span>Edit</span>
          </Link>
          <button className="btn btn-icon-text dropdown-btn" onClick={() => exportDeck(deck)}>
            <Icon name="export"/>
            <span>Export</span>
          </button>
          <button className="btn btn-icon-text dropdown-btn" onClick={() => showDialog(deck.id)}>
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
