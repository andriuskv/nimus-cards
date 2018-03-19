import React from "react";
import Card from "../containers/create-card";

export default function CreateDeck({ deck, message, handleSubmit, addCard, removeCard }) {
    return (
        <React.Fragment>
            <label className="create-title-input-container">
                <div className="side-name">title</div>
                <input id="js-create-deck-title" className="input create-title-input" name="title" defaultValue={deck.title} />
            </label>
            <ul>
                {deck.cards.map((card, index) => (
                    <Card key={card.id} index={index} card={card} cardCount={deck.cards.length} removeCard={removeCard} />
                ))}
            </ul>
            <div className="container-footer create-footer">
                <button type="button" className="btn" onClick={addCard}>New Card</button>
                {message && <span className="create-message">{message}</span>}
                <button type="submit" className="btn" onClick={handleSubmit}>Create</button>
            </div>
        </React.Fragment>
    );
}
