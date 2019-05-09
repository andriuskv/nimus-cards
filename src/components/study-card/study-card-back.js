import React from "react";
import Icon from "../icon";

export default function StudyCardBack({ card, selectOption, handleChange }) {
    const { id, back, answerRevealed } = card;
    const { text, textSize, type, options, correct } = back;

    function renderContent() {
        if (type === "text") {
            return (
                <div className="side-text study-side-text">
                    <div style={{ fontSize: `${textSize}px` }}>{text}</div>
                </div>
            );
        }
        else if (type === "exact") {
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
        return (
            <ul onChange={selectOption} className={`study-options ${answerRevealed ? "revealed" : ""}`}>
                {options.map(({ text }, index) => (
                    <li key={id + index}>
                        <label className={`study-option-radio-container ${answerRevealed && correct === index ? "correct" : ""}`}>
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

    return (
        <div className="side-container">
            <div className="side">
                <div className="study-side-content back">{renderContent()}</div>
            </div>
        </div>
    );
}
