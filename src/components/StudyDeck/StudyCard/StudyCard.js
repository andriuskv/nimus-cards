import React from "react";
import CardFront from "./StudyCardFront";
import CardBack from "./StudyCardBack";

export default function StudyCard({ card, selectOption, revealAnswer, nextStep, skipNextStepTimeout }) {
  function handleExactTypeFormSubmit(event) {
    event.preventDefault();

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
  }

  if (card.back.type === "text" && !card.revealed) {
    return (
      <div className="study-card study-card-text">
        <CardFront id={card.id} attachementId={card.attachementId} side={card.front}/>
        <button className="btn study-card-text-btn study-card-text-reveal-btn"
          onClick={revealAnswer}>Check</button>
      </div>
    );
  }
  return (
    <div className={`study-card study-card-${card.back.type}`}>
      <CardFront id={card.id} attachementId={card.attachementId} side={card.front}/>
      <CardBack card={card} selectOption={selectOption} handleSubmit={handleExactTypeFormSubmit}/>
      {card.back.type === "text" && card.revealed && !card.timerReveal && (
        <div className="study-card-text-btns">
          {card.finished ? (
            <button className="btn study-card-text-btn"
              onClick={skipNextStepTimeout}>Next</button>
          ) : (
            <>
              <button className="btn btn-danger study-card-text-btn"
                disabled={card.finished}
                onClick={() => nextStep(false)}>I Was Wrong</button>
              <button className="btn btn-success study-card-text-btn"
                disabled={card.finished}
                onClick={() => nextStep(true)}>I Got It Right</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
