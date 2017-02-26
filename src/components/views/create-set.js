import React from "react";
import Container from "./container";
import CardSide from "./create-card-side";

export default function CreateSet({ set, message, handleSubmit, handleChange, getNewCard }) {
    return (
        <Container title="Create New Flashcard Set">
            <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
                <label className="create-side">
                    <div className="side-name">Set title</div>
                    <input id="title" className="input create-title-input" name="title"
                        defaultValue={set.title} required />
                </label>
                <ul className="create-cards">
                    {set.cards.map((card, index) => (
                        <li className="create-card" key={index}>
                            <CardSide index={index} side="front" content={card.front}
                                hasError={!card.front && card.back} />
                            <CardSide index={index} side="back" content={card.back}
                                hasError={!card.back && card.front} />
                        </li>
                    ))}
                </ul>
                <div className="create-footer">
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
