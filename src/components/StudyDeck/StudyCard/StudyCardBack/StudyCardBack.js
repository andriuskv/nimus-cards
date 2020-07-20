import React from "react";
import "./study-card-back.scss";
import { classNames } from "../../../../helpers";
import Icon from "../../../Icon";

export default function StudyCardBack({ card, selectOption, handleSubmit }) {
  const { back, revealed } = card;
  const { type, typeOptions } = back;

  function renderTextTypeContent() {
    return <div className="study-card-text-content" style={{ fontSize: `${typeOptions.textSize}px` }}>{typeOptions.value}</div>;
  }

  function renderExactTypeContent() {
    let inputClassName = "input study-exact-input";

    if (revealed) {
      inputClassName += card.isCorrect ? " right" : " wrong";
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
          <input type="input" className={inputClassName} name="answer" disabled={revealed}/>
        </label>
        <button className="btn study-exact-btn" disabled={revealed}>Check Answer</button>
      </form>
    );
  }

  function renderMultiTypeContent() {
    return (
      <ul className={
        classNames(
          "study-multi",
          `study-multi-${back.typeOptions.layout}-type`,
          `${revealed ? "revealed" : ""}`
        )}>
        {typeOptions.options.map(({ id, value }, index) => (
          <li key={id + index}>
            <button onClick={() => selectOption(id)}
              className={classNames(
                "btn study-multi-item",
                `study-multi-${back.typeOptions.layout}-type-item`,
                revealed && typeOptions.correctId === id ? "correct" : ""
              )}>{value}</button>
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
