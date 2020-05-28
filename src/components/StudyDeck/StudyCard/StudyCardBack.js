import React from "react";
import Icon from "../../Icon";

export default function StudyCardBack({ card, selectOption, handleSubmit }) {
  const { back, answerRevealed } = card;
  const { type, typeOptions } = back;

  function renderTextTypeContent() {
    return <div className="study-card-text-content" style={{ fontSize: `${typeOptions.textSize}px` }}>{typeOptions.value}</div>;
  }

  function renderExactTypeContent() {
    let inputClassName = "input study-exact-input";

    if (answerRevealed) {
      inputClassName += card.correct ? " right" : " wrong";
    }
    return (
      <form onSubmit={handleSubmit} className="study-exact">
        <label>
          <div className="study-exact-top">
            <div className="study-exact-title">Your Answer:</div>
            {back.typeOptions.caseSensitive ? (
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
    const containerClassName = ` study-multi-${back.typeOptions.layout}-type`;
    const itemClassName = `study-multi-${back.typeOptions.layout}-type-item`;

    return (
      <ul className={`study-multi${containerClassName}${answerRevealed ? " revealed" : ""}`}>
        {typeOptions.options.map(({ id, value }) => (
          <li key={id}>
            <button className={`btn study-multi-item ${itemClassName}${answerRevealed && typeOptions.correctId === id ? " correct" : ""}`} onClick={() => selectOption(id)}>{value}</button>
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
