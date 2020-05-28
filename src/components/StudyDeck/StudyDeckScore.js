import React from "react";
import { Link } from "react-router-dom";
import StudyScoreBar from "./StudyDeckScoreBar";

export default function StudyDeckScore({ score, mode, notLastSession, initNextLevel, initNextSession }) {
  const { session } = score;

  function getLeitnerBtnText() {
    let level = score.currentLevel + 1;

    if (score.wrong) {
      level -= level > 1 ? 1 : 0;
    }
    else {
      level += 1;
    }
    return `Continue to Level ${level}`;
  }

  return (
    <div className="deck-score-container">
      <h3 className="deck-score-title">Session Results</h3>
      <div className="deck-score-accuracy">
        <span className="deck-score-accuracy-name">Accuracy</span>
        <span className="deck-score-accuracy-value">{Math.round(session.right / session.total * 100)}%</span>
      </div>
      <div className="deck-score-bars">
        <div className="deck-score-bar-container">
          <span className="deck-score-bar-name">Right</span>
          <div className="deck-score-bar">
            <StudyScoreBar score={session} name="right" />
          </div>
        </div>
        <div className="deck-score-bar-container">
          <span className="deck-score-bar-name">Wrong</span>
          <div className="deck-score-bar">
            <StudyScoreBar score={session} name="wrong" />
          </div>
        </div>
      </div>
      <div className="deck-score-btn-container">
        {score.isLast ? notLastSession && (
          <button className="btn deck-score-btn" onClick={initNextSession}>Next Session</button>
        ) : (
          <button className="btn deck-score-btn" onClick={initNextLevel}>
            {mode === "standard" ? "Next Round" : getLeitnerBtnText()}
          </button>
        )}
        <Link to="/decks" className="btn">Close</Link>
      </div>
    </div>
  );
}
