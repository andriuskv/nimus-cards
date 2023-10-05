import "./study-card.css";
import CardFront from "./StudyCardFront";
import CardBack from "./StudyCardBack";

export default function StudyCard({ card, settings, selectOption, revealAnswer, nextStep, skipNextStepTimeout }) {
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

  return (
    <div className="study-card" style={{ "--text-base-size": `${settings.textSize.value}rem` }}>
      <CardFront id={card.id} attachmentId={card.attachmentId} side={card.front}/>
      {card.back.type === "text" && !card.revealed ? (
        <button className="btn btn-invert study-card-text-btn"
          onClick={revealAnswer}>Check</button>
      ) : (
        <>
          <CardBack card={card} selectOption={selectOption} handleSubmit={handleExactTypeFormSubmit}/>
          {card.back.type === "text" && card.revealed && (
            card.finished || card.timerReveal ? (
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
            )
          )}
        </>
      )}
    </div>
  );
}
