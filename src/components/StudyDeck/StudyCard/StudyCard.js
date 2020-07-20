import React from "react";
import "./study-card.scss";
import CardFront from "./StudyCardFront";
import CardBack from "./StudyCardBack";

export default function StudyCard({ card, selectOption, revealAnswer, nextStep, skipNextStepTimeout }) {
  function handleExactTypeFormSubmit(event) {
    event.preventDefault();
    event.persist();

    if (card.revealed) {
      return;
    }
    const answer = event.target.elements.answer.value;
    let isCorrect = false;

    if (card.back.typeOptions.caseSensitive) {
      isCorrect = answer === card.back.typeOptions.value;
    }
    else {
      isCorrect = answer.toLowerCase() === card.back.typeOptions.value.toLowerCase();
    }
    nextStep(isCorrect);

    setTimeout(() => {
      event.target.reset();
    }, 1600);
  }

  if (card.back.type === "text" && !card.revealed) {
    return (
      <div className="study-card">
        <CardFront id={card.id} attachmentId={card.attachmentId} side={card.front}/>
        <button className="btn btn-invert study-card-text-btn"
          onClick={revealAnswer}>Check</button>
      </div>
    );
  }
  return (
    <div className="study-card">
      <CardFront id={card.id} attachmentId={card.attachmentId} side={card.front}/>
      <CardBack card={card} selectOption={selectOption} handleSubmit={handleExactTypeFormSubmit}/>
      {card.back.type === "text" && card.revealed && (
        <>
          {card.finished || card.timerReveal ? (
            <button className="btn btn-invert study-card-text-btn"
              onClick={skipNextStepTimeout}>Next</button>
          ) : (
            <div>
              <button className="btn btn-negative study-card-text-btn"
                disabled={card.finished}
                onClick={() => nextStep(false)}>I Was Wrong</button>
              <button className="btn btn-positive study-card-text-btn"
                disabled={card.finished}
                onClick={() => nextStep(true)}>I Got It Right</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
