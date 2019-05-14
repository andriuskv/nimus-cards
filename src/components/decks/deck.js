import React from "react";
import { Link } from "react-router-dom";
import Icon from "../icon";

export default function Deck({ deck, showDialog, editDeck }) {
    function handleEditButtonClick() {
        editDeck(deck);
    }

    function handleRemoveButtonClick() {
        showDialog(deck);
    }

    return (
        <li className="deck">
            <Link to={`/decks/${deck.id}`} className="deck-title">{deck.title}</Link>
            {deck.description && <p className="deck-description">{deck.description}</p>}
            <div className="deck-card-count">
                {deck.cards.length} card{deck.cards.length > 1 && "s"}
            </div>
            <div className="deck-btn-container">
                <button className="btn btn-icon deck-btn" title="Edit"
                    onClick={handleEditButtonClick}>
                    <Icon name="edit" />
                    <span>Edit</span>
                </button>
                <button className="btn btn-icon deck-btn" title="Remove"
                    onClick={handleRemoveButtonClick}>
                    <Icon name="remove" />
                    <span>Remove</span>
                </button>
            </div>
        </li>
    );
}
