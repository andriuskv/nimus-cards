import React from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";

export default function Deck({ deck, showDialog, editDeck, exportDeck }) {
    return (
        <li className="deck">
            <Link to={`/decks/${deck.id}`} className="deck-title">{deck.title}</Link>
            {deck.description && <p className="deck-description">{deck.description}</p>}
            <div className="deck-card-count">
                {deck.cards.length} card{deck.cards.length > 1 && "s"}
            </div>
            <div className="deck-btn-container">
                <button className="btn btn-icon deck-btn" onClick={() => editDeck(deck)}>
                    <Icon name="edit"/>
                    <span>Edit</span>
                </button>
                <button className="btn btn-icon deck-btn" onClick={() => exportDeck(deck)}>
                    <Icon name="export"/>
                    <span>Export</span>
                </button>
                <button className="btn btn-icon deck-btn" onClick={() => showDialog(deck)}>
                    <Icon name="remove"/>
                    <span>Remove</span>
                </button>
            </div>
        </li>
    );
}
