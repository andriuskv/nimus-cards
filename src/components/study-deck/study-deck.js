import React, { Fragment, useEffect, useReducer } from "react";
import { shuffleArray } from "../../helpers";
import { fetchDecks } from "../../services/db";
import { getSettings } from "../../services/settings";
import StudyDeckHeader from "./study-deck-header";
import StudyDeckScore from "./study-deck-score";
import Card from "../study-card/study-card";
import Timer from "./study-deck-timer";

function reducer(currentState, newState) {
    return { ...currentState, ...newState };
}

export default function StudyDeck(props) {
    const [state, setState] = useReducer(reducer, {
        cards: [],
        initialSessionCards: []
    });
    const { cards, card, score, initialSessionCards } = state;
    const settings = getSettings();

    useEffect(() => {
        fetchDecks().then(decks => {
            const { id } = props.match.params;
            const deck = decks.find(deck => deck.id === id);

            if (deck) {
                initDeck(deck);
            }
            else {
                props.history.replace("/decks");
            }
        });
    }, []);

    function initDeck({ title, cards }) {
        const cardCount = settings.cardCount.value;
        const initialCards = settings.randomize.value ? shuffleArray(cards) : cards;
        let initialSessionCards = initialCards;
        let numberOfSessions = -1;

        if (cardCount) {
            numberOfSessions = Math.ceil(cards.length / cardCount);
            initialSessionCards = initialCards.slice(0, cardCount);
        }
        setState({
            currentSession: 0,
            numberOfSessions,
            title,
            initialCards,
            initialSessionCards,
            cards: [...initialSessionCards],
            card: getCard(initialSessionCards),
            score: initScore(initialSessionCards)
        });
    }

    function initScore(cards) {
        const score = resetScoreCounter({
            currentLevel: 0,
            session: resetScoreCounter()
        });

        if (settings.studyMode.value === "standard") {
            score.incorrectIds = [];
        }
        else {
            const cardIds = cards.map(card => card.id);
            score.levels = [cardIds, [], [], [], []];
        }
        return score;
    }

    function getCard(cards, index = 0) {
        const { id, front, back } = cards[index];

        return {
            index,
            id,
            front,
            back,
            answerRevealed: false
        };
    }

    function resetScoreCounter(score = {}) {
        return {
            ...score,
            right: 0,
            wrong: 0,
            total: 0
        };
    }

    function updateStandardScore(correct, score) {
        if (!correct) {
            score.incorrectIds.push(card.id);
        }
        score.isLast = score.right === score.total;
        return score;
    }

    function updateLeitnerScore(correct, score) {
        let levelNum = score.currentLevel;

        if (correct) {
            levelNum += 1;
        }
        else {
            if (!levelNum) {
                return score;
            }
            levelNum -= 1;
        }
        const currentLevel = score.levels[score.currentLevel];
        const index = currentLevel.findIndex(id => id === card.id);
        const [id] = currentLevel.splice(index, 1);

        score.levels[levelNum].push(id);
        score.isLast = score.levels[4].length === initialSessionCards.length;
        return score;
    }

    function updateScoreCounter(correct, score) {
        if (correct) {
            score.right += 1;
        }
        else {
            score.wrong += 1;
        }
        score.total = score.right + score.wrong;
    }

    function updateScore(correct) {
        updateScoreCounter(correct, score);
        updateScoreCounter(correct, score.session);

        if (settings.studyMode.value === "standard") {
            return updateStandardScore(correct, score);
        }
        return updateLeitnerScore(correct, score);
    }

    function getNextLevelCards(cards, cardIds) {
        return cards.filter(card => cardIds.includes(card.id));
    }

    function setNextLevel(nextCards) {
        const cards = settings.randomize.value ? shuffleArray(nextCards) : nextCards;

        setState({
            score: resetScoreCounter(score),
            card: getCard(cards),
            cards,
            wasLastCard: false
        });
    }

    function initNextStandardRound() {
        const nextCards = getNextLevelCards(cards, score.incorrectIds);
        score.currentLevel += 1;
        score.incorrectIds.length = 0;
        setNextLevel(nextCards);
    }

    function initNextLeitnerLevel() {
        const { levels } = score;

        // Find first level with cards
        const index = levels.findIndex(level => level.length);
        const cards = getNextLevelCards(initialSessionCards, levels[index]);
        score.currentLevel = index;
        setNextLevel(cards);
    }

    function initNextLevel() {
        if (settings.studyMode.value === "standard") {
            initNextStandardRound();
        }
        else {
            initNextLeitnerLevel();
        }
    }

    function revealAnswer() {
        const newState = {};
        card.answerRevealed = true;

        if (card.back.type === "multi") {
            newState.score = updateScore(card.back.correct === state.selectedOption);
            newState.selectedOption = 0;
        }
        else if (card.back.type === "exact") {
            const { answer } = state;
            let isCorrect = false;

            if (card.back.caseSensitive) {
                isCorrect = answer === card.back.input;
            }
            else {
                isCorrect = answer.toLowerCase() === card.back.input.toLowerCase();
            }
            newState.score = updateScore(isCorrect);
        }
        setState({ card, ...newState });
    }

    function selectOption({ target }) {
        setState({ selectedOption: parseInt(target.getAttribute("data-index"), 10) });
    }

    function initNextSession() {
        const cardCount = settings.cardCount.value;
        const offset = cardCount * state.currentSession;
        const newCards = state.initialCards.slice(offset, offset + cardCount);

        setNextLevel(newCards);
    }

    function nextStep(correct) {
        const index = card.index + 1;
        const wasLastCard = index === cards.length;
        let nextCard = null;
        let newScore = score;
        let { currentSession } = state;

        if (typeof correct === "boolean") {
            newScore = updateScore(correct);
        }

        if (!wasLastCard) {
            nextCard = getCard(cards, index);
        }
        else if (newScore.isLast) {
            currentSession += 1;
        }
        setState({
            wasLastCard,
            currentSession,
            score: newScore,
            card: nextCard
        });
    }

    function handleChange({ target }) {
        setState({ answer: target.value });
    }

    if (!cards.length) {
        return null;
    }
    return (
        <Fragment>
            <h1 className="component-header study-deck-title">
                <div className="study-progress" style={{ transform: `scaleX(${card ? card.index / cards.length : 1})` }}></div>
                <span>{state.title}</span>
            </h1>
            {state.wasLastCard ? (
                <StudyDeckScore
                    score={score}
                    mode={settings.studyMode.value}
                    initNextLevel={initNextLevel}
                    notLastSession={state.numberOfSessions - state.currentSession > 0}
                    initNextSession={initNextSession}>
                </StudyDeckScore>
            ) : (
                <Fragment>
                    <div className="study-container">
                        <StudyDeckHeader score={score} mode={settings.studyMode.value} />
                        <Card card={card} selectOption={selectOption} handleChange={handleChange} />
                    </div>
                    <div className="container-footer study-footer">
                        {card.answerRevealed ?
                            card.back.type === "text" ? (
                                <Fragment>
                                    <button className="btn-danger study-footer-btn"
                                        onClick={() => nextStep(false)}>I Was Wrong</button>
                                    <button className="btn-success study-footer-btn"
                                        onClick={() => nextStep(true)}>I Got It Right</button>
                                </Fragment>

                            ) : <button className="btn" onClick={nextStep}>Next</button> :
                            <Fragment>
                                {settings.timeoutDuration.value > 0 && (
                                    <Timer duration={settings.timeoutDuration.value} callback={revealAnswer} />
                                )}
                                <button className="btn" onClick={revealAnswer}>Reveal</button>
                            </Fragment>
                        }
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}
