import React, { useContext } from "react";
import { CreateDeckContext } from "../../context/CreateDeckContext";
import Icon from "../icon";
import CardFront from "./create-card-front";
import CardBack from "./create-card-back";

export default function CreateCard({ index, card, removeCard }) {
    const { state, dispatch } = useContext(CreateDeckContext);

    function handleChange({ target }, name, key) {
        const { value } = target;

        if (value !== card[name][key]) {
            dispatch({
                type: "UPDATE_SIDE_VALUE",
                index,
                side: name,
                key,
                value
            });
        }
    }

    return (
        <li className="create-list-item">
            <div className="create-card-index">{index + 1}.</div>
            <div className="create-input-group create-card">
                <CardFront index={index} side={card.front} handleChange={handleChange} />
                <CardBack index={index} handleChange={handleChange} />
            </div>
            <div className="create-card-btns">
                {state.cards.length > 1 && (
                    <button className="btn btn-icon" title="Remove card" onClick={() => removeCard(index)}>
                        <Icon name="remove" />
                    </button>
                )}
            </div>
        </li>
    );
}
