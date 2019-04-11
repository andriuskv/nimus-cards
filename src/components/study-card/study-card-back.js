import React from "react";

export default function StudyCardBack({ card, revealAnswer, selectOption }) {
    const { id, back, frontSideVisible, answerRevealed } = card;
    const { text, textSize, type, options, correct } = back;

    function renderContent() {
        if (type === "text") {
            if (answerRevealed) {
                return (
                    <div className="side-text study-side-text">
                        <div style={{ fontSize: `${textSize}px` }}>{text}</div>
                    </div>
                );
            }
            return <button className="btn study-reveal-btn" onClick={revealAnswer}>Reveal</button>;
        }
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
        <div className={`side-container${!frontSideVisible ? " visible" : ""}`}>
            <div className="side-name">back</div>
            <div className="side">
                <div className="study-side-content">{renderContent()}</div>
            </div>
        </div>
    );
}
