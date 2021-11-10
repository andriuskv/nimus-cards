import StudyScoreBar from "./StudyDeckScoreBar";

export default function StudyDeckHeader({ score }) {
  return (
    <div className="study-score">
      <div className="study-score-bar-name-container">
        <span>Wrong</span>
        <span>Right</span>
      </div>
      <div className="study-score-bar-container">
        <StudyScoreBar score={score} name="wrong"/>
        <StudyScoreBar score={score} name="right"/>
      </div>
    </div>
  );
}
