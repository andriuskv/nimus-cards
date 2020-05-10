import React, { Fragment, useEffect, useReducer, useRef } from "react";
import "./study-deck.scss";
import { shuffleArray } from "../../helpers";
import { fetchDecks } from "../../services/db";
import { getSettings } from "../../services/settings";
import StudyDeckHeader from "./StudyDeckHeader";
import StudyDeckScore from "./StudyDeckScore";
import Card from "./StudyCard";
import Timer from "./Timer";

function reducer(currentState, newState) {
    return { ...currentState, ...newState };
}

export default function StudyDeck(props) {
    const [state, setState] = useReducer(reducer, {
        cards: [],
        initialSessionCards: []
    });
    const nextStepTimeout = useRef(0);
    const { cards, card, score, initialSessionCards, studyMode } = state;
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

    function initDeck({ title, cards, studyMode }) {
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
            studyMode,
            initialCards,
            initialSessionCards,
            cards: [...initialSessionCards],
            card: getCard(initialSessionCards),
            score: initScore(initialSessionCards, studyMode)
        });
    }

    function initScore(cards, studyMode) {
        const score = resetScoreCounter({
            currentLevel: 0,
            session: resetScoreCounter()
        });

        if (studyMode === "standard") {
            score.incorrectIds = [];
        }
        else {
            const cardIds = cards.map(card => card.id);
            score.levels = [cardIds, [], [], [], []];
        }
        return score;
    }

    function getCard(cards, index = 0) {
        const card = cards[index];

        if (card.back.type === "multi") {
            card.back.typeOptions.options = shuffleArray(card.back.typeOptions.options);
        }
        return {
            ...card,
            index,
            answerRevealed: false,
            notes: {
                ...card.notes
            }
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

        if (studyMode === "standard") {
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
        if (studyMode === "standard") {
            initNextStandardRound();
        }
        else {
            initNextLeitnerLevel();
        }
    }

    function timerRevealAnswer() {
        nextStep(false, { timerReveal: true });
    }

    function revealAnswer() {
        card.answerRevealed = true;
        setState({ card });
    }

    function selectOption(id) {
        if (card.answerRevealed) {
            return;
        }
        nextStep(id === card.back.typeOptions.correctId);
    }

    function initNextSession() {
        const cardCount = settings.cardCount.value;
        const offset = cardCount * state.currentSession;
        const newCards = state.initialCards.slice(offset, offset + cardCount);

        setNextLevel(newCards);
    }

    function nextStep(correct, params = {}) {
        const newScore = updateScore(correct);
        const currentCard = {
            ...card,
            ...params,
            correct,
            answerRevealed: true,
            finished: true
        };

        setState({ card: currentCard, score: newScore });
        nextStepTimeout.current = setTimeout(() => {
            setState(getNextCard(newScore.isLast));
        }, 1600);
    }

    function getNextCard(isLastCard) {
        const index = card.index + 1;
        const wasLastCard = index === cards.length;
        let nextCard = null;
        let { currentSession } = state;

        if (!wasLastCard) {
            nextCard = getCard(cards, index);
        }
        else if (isLastCard) {
            currentSession += 1;
        }
        return {
            wasLastCard,
            currentSession,
            card: nextCard
        };
    }

    function skipNextStepTimeout() {
        clearTimeout(nextStepTimeout.current);
        setState(getNextCard(state.score.isLast));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (card.answerRevealed) {
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

    if (!cards.length) {
        return null;
    }
    return (
        <Fragment>
            <div className="study-header">
                <div className="study-progress" style={{ transform: `scaleX(${card ? card.index / cards.length : 1})` }}></div>
                <h1 className="study-header-title">{state.title}</h1>
                {!state.wasLastCard && settings.timeoutDuration.value > 0 && (
                    <Timer id={card.id}
                        revealed={card.answerRevealed}
                        initDuration={settings.timeoutDuration.value}
                        callback={timerRevealAnswer}/>
                )}
            </div>
            {state.wasLastCard ? (
                <StudyDeckScore
                    score={score}
                    mode={studyMode}
                    initNextLevel={initNextLevel}
                    notLastSession={state.numberOfSessions - state.currentSession > 0}
                    initNextSession={initNextSession}/>
            ) : (
                <Fragment>
                    <StudyDeckHeader score={score} mode={studyMode} />
                    <Card card={card}
                        handleSubmit={handleSubmit}
                        selectOption={selectOption}
                        revealAnswer={revealAnswer}
                        skipNextStepTimeout={skipNextStepTimeout}
                        nextStep={nextStep}/>
                </Fragment>
            )}
        </Fragment>
    );
}
