import React, { useState } from "react";
import { useStore } from "../../context/CreateDeckContext";
import Icon from "../icon";
import CardFront from "./create-card-front";
import CardBack from "./create-card-back";
import CardNotes from "./create-card-notes";

export default function CreateCard({ index, card, removeCard }) {
    const { state, dispatch } = useStore();
    const [notesVisible, setNotesVisibility] = useState(card.notes && !!card.notes.value);

    function toggleNotes() {
        setNotesVisibility(!notesVisible);
    }

    function handleChange({ target }, name, key) {
        const { value } = target;

        if (value !== card[name][key]) {
            dispatch({
                type: "UPDATE_CARD_VALUE",
                index,
                name,
                key,
                value
            });
        }
    }

    return (
        <li className="create-list-item">
            <div className="create-card-index">{index + 1}.</div>
            <div className="deck-form-field-group create-card">
                <CardFront index={index} side={card.front} handleChange={handleChange} />
                <CardBack index={index} handleChange={handleChange} />
                {notesVisible && <CardNotes value={card.notes.value} handleChange={handleChange}/>}
            </div>
            <div className="create-card-btns">
                <button className="btn btn-icon" title="Toggle notes" onClick={toggleNotes}>
                    <Icon name="notes" />
                </button>
                {state.cards.length > 1 && (
                    <button className="btn btn-icon" title="Remove card" onClick={() => removeCard(index)}>
                        <Icon name="remove" />
                    </button>
                )}
            </div>
        </li>
    );
}
