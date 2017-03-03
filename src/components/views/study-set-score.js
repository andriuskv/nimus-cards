import React from "react";
import Container from "./container";

export default function StudySetScore({ setTitle, cardCount, score, closeScore }) {
    return (
        <Container title={setTitle}>
            <div className="container">
                <div className="set-score-container">
                    <h3 className="set-score-title">Test results</h3>
                    <div className="set-score-in-percent">{Math.round(score.right / cardCount * 100)}%</div>
                    <div className="set-score-in-words">{score.right} out of {cardCount} correct</div>
                    <button className="btn" onClick={closeScore}>Close</button>
                </div>
            </div>
        </Container>
    );
}
