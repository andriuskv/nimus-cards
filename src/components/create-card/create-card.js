import React, { useState, useContext } from "react";
import { CreateDeckContext } from "../../context/CreateDeckContext";
import Icon from "../icon";
import CardFront from "./create-card-front";
import CardBack from "./create-card-back";

export default function CreateCard({ index }) {
    const { state, dispatch } = useContext(CreateDeckContext);
    const [frontSideVisible, setSideVisibility] = useState(true);
    const card = state.cards[index];

    function flipSide() {
        setSideVisibility(!frontSideVisible);
    }

    function removeCard() {
        dispatch({ type: "REMOVE_CARD", id: card.id });
    }

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
                <CardFront index={index}
                    visible={frontSideVisible}
                    handleChange={handleChange} />
                <CardBack index={index}
                    visible={!frontSideVisible}
                    handleChange={handleChange} />
            </div>
            <div className="create-card-btns">
                <button className="btn-icon create-card-flip-btn" title="Flip side"
                    onClick={flipSide}>
                    <Icon name="flip" />
                </button>
                <button className="btn-icon" title="Remove card" onClick={removeCard}>
                    <Icon name="remove" />
                </button>
            </div>
        </li>
    );
}
