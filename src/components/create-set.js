import React from "react";
import Container from "./container";
import Card from "../containers/create-card";

export default function CreateSet({ set, message, handleSubmit, addCard, removeCard }) {
    return (
        <Container title="Create New Flashcard Set">
            <label className="create-title-input-container">
                <div className="side-name">Set title</div>
                <input id="js-create-set-title" className="input create-title-input" name="title"
                    defaultValue={set.title} />
            </label>
            <ul>
                {set.cards.map((card, index) => (
                    <Card key={card.id} index={index} card={card} cardCount={set.cards.length} removeCard={removeCard} />
                ))}
            </ul>
            <div className="container-footer create-footer">
                <button type="button" className="btn" onClick={addCard}>New Card</button>
                <div>
                    {message && <span className="create-message">{message}</span>}
                    <button type="submit" className="btn" onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </Container>
    );
}
