import React from "react";
import { Link } from "react-router-dom";
import { getCardsToLearn, getCardsToReview } from "../../helpers";
import StudyScoreBar from "./StudyDeckScoreBar";

export default function StudyDeckScore({ score, deck, ids }) {
  const hasCardsToLearn = !!getCardsToLearn(deck.cards).length;
  const hasCardsToReview = !!getCardsToReview(deck.cards).length;
  const cards = deck.cards.filter(card => ids.some(id => card.id === id));

  function getBackSideValue(side) {
    if (side.type === "text" || side.type === "exact") {
      return side.typeOptions.value;
    }
    else if (side.type === "multi") {
      return side.typeOptions.options.find(({ id }) => side.typeOptions.correctId === id).value;
    }
  }

  return (
    <>
      <div className="deck-score-container">
        <h3 className="deck-score-title">Session Results</h3>
        <div className="deck-score-accuracy">
          <span className="deck-score-accuracy-name">Accuracy</span>
          <span className="deck-score-accuracy-value">{Math.round(score.right / score.total * 100)}%</span>
        </div>
        <div className="deck-score-bars">
          <div className="deck-score-bar-container">
            <span className="deck-score-bar-name">Wrong</span>
            <div className="deck-score-bar">
              <StudyScoreBar score={score} name="wrong"/>
            </div>
          </div>
          <div className="deck-score-bar-container">
            <span className="deck-score-bar-name">Right</span>
            <div className="deck-score-bar">
              <StudyScoreBar score={score} name="right"/>
            </div>
          </div>
        </div>
        <div className="deck-score-btn-container">
          {hasCardsToLearn ? (
            <Link to={{
              pathname: `/decks/${deck.id}/pearn`,
              search: "?reload=1"
            }} className="btn btn-text deck-score-btn">Learn</Link>
          ) : <span className="btn btn-text deck-score-btn disabled">Learn</span>}
          {hasCardsToReview ? (
            <Link to={{
              pathname: `/decks/${deck.id}/review`,
              search: "?reload=1"
            }} className="btn btn-text deck-score-btn">Review</Link>
          ) : <span className="btn btn-text deck-score-btn disabled">Review</span>}
          <Link to={{
            pathname: `/decks/${deck.id}/practice`,
            search: "?reload=1"
          }} className="btn btn-text deck-score-btn">Practice</Link>
          <Link to="/decks" className="btn btn-text deck-score-btn">Close</Link>
        </div>
      </div>
      <ul className="study-session-stats">
        <li className="study-session-stats-item">
          <div className="study-session-stats-column study-session-stats-header-item">Front</div>
          <div className="study-session-stats-column study-session-stats-header-item study-session-stats-back-column">Back</div>
          <div className="study-session-stats-column study-session-stats-header-item study-session-stats-accuracy-column">Accuracy</div>
          <div className="study-session-stats-column study-session-stats-header-item study-session-stats-streak-column">Streak</div>
        </li>
        {cards.map((card, index) => (
          <li className="study-session-stats-item" key={index}>
            <div className="study-session-stats-column">{card.front.attachment?.description || card.front.text}</div>
            <div className="study-session-stats-column study-session-stats-back-column">{getBackSideValue(card.back)}</div>
            <div className="study-session-stats-column study-session-stats-accuracy-column">
              <StudyScoreBar score={card.score} className="small" name="wrong"/>
              <StudyScoreBar score={card.score} className="small" name="right"/>
            </div>
            <div className="study-session-stats-column study-session-stats-streak-column">{card.score.streak}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
