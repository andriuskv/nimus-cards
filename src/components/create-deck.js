import React from "react";
import Card from "../containers/create-card";

export default function CreateDeck({ deck, message, handleSubmit, addCard, removeCard }) {
    return (
        <React.Fragment>
            <div className="create-input-group">
                <label className="create-input-label">
                    <div className="side-name">title</div>
                    <input id="js-deck-title" className="input create-title-input" defaultValue={deck.title} />
                </label>
                <label className="create-input-label">
                    <div className="side-name">description (optional)</div>
                    <textarea id="js-deck-description" className="input side-text create-description-input" defaultValue={deck.description}></textarea>
                </label>
            </div>
            {deck.cards.length ?
                <ul>
                    {deck.cards.map((card, index) => (
                        <Card key={card.id} index={index} card={card} removeCard={removeCard} />
                    ))}
                </ul> :
                <p className="create-deck-message">Deck is empty</p>
            }
            <div className="container-footer create-footer">
                <button className="btn" onClick={addCard}>New Card</button>
                {message && <span className="create-message">{message}</span>}
                <button className="btn" onClick={handleSubmit}>Create</button>
            </div>
        </React.Fragment>
    );
}
