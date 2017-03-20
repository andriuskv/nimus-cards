import React from "react";
import Container from "./container";
import CardSide from "./create-card-side";

export default function CreateSet({ set, message, handleSubmit, handleChange, getNewCard, removeCard }) {
    function renderListItem(card, index) {
        return (
            <li className="create-list-item" key={card.id}>
                <div className="create-card-index">{index + 1}</div>
                <div className="create-card">
                    <CardSide index={index} side="front" content={card.front}
                        hasError={!card.front && card.back} />
                    <CardSide index={index} side="back" content={card.back}
                        hasError={!card.back && card.front} />
                </div>
                <div className="create-card-btns">
                    <button type="button" className="btn-icon" title="Remove card"
                        onClick={() => removeCard(index)}>
                        <svg className="icon" viewBox="0 0 24 24">
                            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,
                                21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                    </button>
                </div>
            </li>
        );
    }

    return (
        <Container title="Create New Flashcard Set">
            <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
                <label className="create-title-input-container">
                    <div className="side-name">Set title</div>
                    <input id="title" className="input create-title-input" name="title"
                        defaultValue={set.title} required />
                </label>
                <ul>{set.cards.map(renderListItem)}</ul>
                <div className="container-footer create-footer">
                    <button type="button" className="btn" onClick={getNewCard}>New Card</button>
                    <div>
                        {message && <span className="create-message">{message}</span>}
                        <button type="submit" className="btn">Create</button>
                    </div>
                </div>
            </form>
        </Container>
    );
}
