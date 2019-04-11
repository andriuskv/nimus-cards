import React, { useState } from "react";
import { getRandomString } from "../../helpers";
import Icon from "../icon";
import CardFront from "./create-card-front";
import CardBack from "./create-card-back";

export default function CreateCard({ card: initialCard, index, removeCard }) {
    const [card, setCard] = useState(initialCard);
    const [frontSideVisible, setSideVisibility] = useState(true);

    function flipSide() {
        setSideVisibility(!frontSideVisible);
    }

    function handleChange({ target }) {
        const { name, value } = target;
        const side = card[name];

        if (value !== side.text) {
            side.text = value;
            setCard({ ...card });
        }
    }

    function handleTextSizeSelect({ target }) {
        const { name, value } = target;
        const side = card[name];

        side.textSize = value;
        setCard({ ...card });
    }

    function handleTypeChange({ target }) {
        card.back.type = target.value;
        setCard({ ...card });
    }

    function handleAChange({ target }) {
        const { name, value } = target;

        if (value !== card.back.text) {
            card.back.options[name].text = value;
            setCard({ ...card });
        }
    }

    function addOption() {
        card.back.options.push({
            id: getRandomString()
        });
        setCard({ ...card });
    }

    function removeOption(index) {
        if (index === card.back.correct) {
            card.back.correct = 0;
        }
        card.back.options.splice(index, 1);
        setCard({ ...card });
    }

    function markAnswerAsCorrect(index) {
        card.back.correct = index;
        setCard({ ...card });
    }

    return (
        <li className="create-list-item">
            <div className="create-card-index">{index + 1}.</div>
            <div className="create-input-group create-card">
                <CardFront
                    visible={frontSideVisible}
                    side={card.front}
                    card={card}
                    handleChange={handleChange}
                    handleTextSizeSelect={handleTextSizeSelect} />
                <CardBack
                    visible={!frontSideVisible}
                    card={card}
                    handleChange={handleChange}
                    handleTextSizeSelect={handleTextSizeSelect}
                    handleTypeChange={handleTypeChange}
                    handleAChange={handleAChange}
                    addOption={addOption}
                    removeOption={removeOption}
                    markAnswerAsCorrect={markAnswerAsCorrect} />
            </div>
            <div className="create-card-btns">
                <button className="btn-icon create-card-flip-btn" title="Flip side"
                    onClick={flipSide}>
                    <Icon name="flip" />
                </button>
                <button className="btn-icon"
                    title="Remove card"
                    onClick={() => removeCard(index)}>
                    <Icon name="remove" />
                </button>
            </div>
        </li>
    );
}
