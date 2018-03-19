import React from "react";
import { Link } from "react-router-dom";
import Icon from "./icon";

export default function Decks({ decks, loading, editDeck, removeDeck }) {
    function renderDeck(deck, index) {
        return (
            <li className="deck" key={deck.id}>
                <Link to={`/decks/${deck.id}`} className="deck-title">{deck.title}</Link>
                <div className="deck-card-count">
                    {deck.cards.length} card{deck.cards.length > 1 && "s"}
                </div>
                <div className="deck-btn-container">
                    <button className="btn-icon deck-btn" title="Edit"
                        onClick={() => editDeck(deck)}>
                        <Icon name="edit" />
                        <span>Edit</span>
                    </button>
                    <button className="btn-icon deck-btn" title="Remove"
                        onClick={() => removeDeck(index)}>
                        <Icon name="remove" />
                        <span>Remove</span>
                    </button>
                </div>
            </li>
        );
    }

    return !loading && (decks.length ?
        <React.Fragment>
            <ul>{decks.map(renderDeck)}</ul>
            <div className="container-footer">
                <Link to="/decks/create" className="btn">Create Deck</Link>
            </div>
        </React.Fragment> :
        <div className="deck-list-message-container">
            <h2>You have no decks</h2>
            <Link to="/decks/create" className="btn">Create New Deck</Link>
        </div>
    );
}
