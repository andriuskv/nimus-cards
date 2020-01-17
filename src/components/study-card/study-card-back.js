import React from "react";
import Icon from "../icon";

export default function StudyCardBack({ card, selectOption, handleSubmit }) {
    const { back, answerRevealed } = card;
    const { text, textSize, type, options, correctId } = back;

    function renderTextTypeContent() {
        return <div className="study-card-text-content" style={{ fontSize: `${textSize}px` }}>{text}</div>;
    }

    function renderExactTypeContent() {
        let inputClassName = "input study-exact-input";

        if (answerRevealed) {
            inputClassName += card.correct ? " right" : " wrong";
        }
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    <div className="study-exact-top">
                        <div className="study-exact-title">Your Answer:</div>
                        {back.caseSensitive ? (
                            <div className="study-exact-notice">
                                <Icon name="info" className="study-exact-notice-icon"/>
                                <span>Answer is case sensitive</span>
                            </div>
                        ) : ""}
                    </div>
                    <input type="input" className={inputClassName} name="answer" disabled={answerRevealed} />
                </label>
                <button className="btn study-exact-btn">Check Answer</button>
            </form>
        );
    }

    function renderMultiTypeContent() {
        let containerClassName = "";
        let itemClassName = "study-multi-list-item";

        if (back.useGrid) {
            containerClassName = " study-multi-grid";
            itemClassName = "study-multi-grid-item";
        }
        return (
            <ul className={`study-multi${containerClassName}${answerRevealed ? " revealed" : ""}`}>
                {options.map(({ id, text }) => (
                    <li key={id}>
                        <button className={`btn study-multi-item ${itemClassName}${answerRevealed && correctId === id ? " correct" : ""}`} onClick={() => selectOption(id)}>{text}</button>
                    </li>
                ))}
            </ul>
        );
    }

    if (type === "text") {
        return renderTextTypeContent();
    }
    else if (type === "exact") {
        return renderExactTypeContent();
    }
    else if (type === "multi") {
        return renderMultiTypeContent();
    }
    return null;
}
