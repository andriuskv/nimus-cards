import React from "react";
import CardFront from "./StudyCardFront";
import CardBack from "./StudyCardBack";
import CardNotes from "./StudyCardNotes";

export default function StudyCard({ card, selectOption, handleSubmit, revealAnswer, nextStep, skipNextStepTimeout }) {
  if (card.back.type === "text" && !card.answerRevealed) {
    return (
      <div className="study-card study-card-text">
        <CardFront id={card.id} side={card.front}/>
        <button className="btn study-card-text-btn study-card-text-reveal-btn"
          onClick={revealAnswer}>Reveal</button>
        <CardNotes id={card.id} notes={card.notes}/>
      </div>
    );
  }
  return (
    <div className={`study-card study-card-${card.back.type}`}>
      <CardFront id={card.id} side={card.front}/>
      <CardBack card={card} selectOption={selectOption} handleSubmit={handleSubmit}/>
      {card.back.type === "text" && card.answerRevealed && !card.timerReveal && (
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
      <CardNotes id={card.id} notes={card.notes}/>
    </div>
  );
}
