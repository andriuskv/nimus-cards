import React from "react";
import Icon from "../icon";

export default function StudyCardBack({ card, selectOption, handleChange }) {
    const { id, back, answerRevealed } = card;
    const { text, textSize, type, options, correct } = back;

    function renderTextTypeContent() {
        return (
            <div className="study-side-text">
                <div className="study-side-text-inner" style={{ fontSize: `${textSize}px` }}>{text}</div>
            </div>
        );
    }

    function renderExactTypeContent() {
        return (
            <div className="study-exact-container">
                <label>
                    <div className="study-exact-title">Your Answer:</div>
                    <input type="input" className="input study-exact-input" onChange={handleChange} disabled={answerRevealed} />
                </label>
                {back.caseSensitive ? (
                    <div className="study-exact-notice-container">
                        <Icon name="info" />
                        <span className="study-exact-notice">Answer is case sensitive</span>
                    </div>
                ) : ""}
            </div>
        );
    }

    function renderMultiTypeContent() {
        return (
            <ul onChange={selectOption} className={`study-options${back.useGrid ? " grid" : ""}${answerRevealed ? " revealed" : ""}`}>
                {options.map(({ text }, index) => (
                    <li key={id + index}>
                        <label className={`study-option-radio-container${answerRevealed && correct === index ? " correct" : ""}${back.selectedOption === index ? " selected" : ""}`}>
                            <input type="radio" className="radio-input" name={id}
                                disabled={answerRevealed}
                                data-index={index}
                                defaultChecked={index === 0} />
                            <div className="radio study-option-radio"></div>
                            <span>{text}</span>
                        </label>
                    </li>
                ))}
            </ul>
        );
    }

    function renderContent() {
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

    return <div className="study-card-content">{renderContent()}</div>;
}
