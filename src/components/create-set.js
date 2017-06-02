import React from "react";
import Container from "./container";
import Card from "../containers/create-card";

export default function CreateSet({ set, message, handleSubmit, handleInput, addCard, removeCard, handleFileUpload }) {
    function renderList() {
        return (
            <ul onInput={handleInput}>
                {set.cards.map((card, index) => (
                    <Card key={card.id} index={index} card={card} cardCount={set.cards.length}
                        removeCard={removeCard}
                        handleFileUpload={handleFileUpload} />
                ))}
            </ul>
        );
    }

    return (
        <Container title="Create New Flashcard Set">
            <form onSubmit={handleSubmit}>
                <label className="create-title-input-container">
                    <div className="side-name">Set title</div>
                    <input id="title" className="input create-title-input" name="title"
                        defaultValue={set.title} required />
                </label>
                {renderList()}
                <div className="container-footer create-footer">
                    <button type="button" className="btn" onClick={addCard}>New Card</button>
                    <div>
                        {message && <span className="create-message">{message}</span>}
                        <button type="submit" className="btn">Create</button>
                    </div>
                </div>
            </form>
        </Container>
    );
}
