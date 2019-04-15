import React from "react";

export default function StudyCardBack({ card, selectOption }) {
    const { id, back, answerRevealed } = card;
    const { text, textSize, type, options, correct } = back;

    function renderMultiTypeContent() {
        return (
            <ul onChange={selectOption} className={`study-options ${answerRevealed ? "revealed" : ""}`}>
                {options.map(({ text }, index) => (
                    <li key={index} className={answerRevealed && correct === index ? "study-option-correct" : ""}>
                        <label className="study-option-radio-container">
                            <input type="radio" className="radio-input" name={id}
                                disabled={answerRevealed}
                                data-index={index}
                                defaultChecked={index === 0} />
                            <div className="radio study-option-radio"
                                title={answerRevealed ? "" : "Mark answer as correct"}></div>
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
                <div className="study-side-content">{type === "text" ? (
                    <div className="side-text study-side-text">
                        <div style={{ fontSize: `${textSize}px` }}>{text}</div>
                    </div>
                ) : renderMultiTypeContent()}</div>
            </div>
        </div>
    );
}
