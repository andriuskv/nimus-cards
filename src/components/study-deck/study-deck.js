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
        card: null,
        score: null,
        cards: [],
        initialCards: [],
        title: "",
        selectedOption: 0,
        wasLastCard: false
    });
    const { cards, card, score, initialCards, title } = state;
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
        const initialCards = getInitialCards(cards);

        setState({
            title,
            initialCards,
            cards: [...initialCards],
            card: getCard(initialCards),
            score: initScore(initialCards)
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

    function getInitialCards(initialCards) {
        const count = settings.cardCount.value;
        const cards = settings.randomize.value ? shuffleArray(initialCards) : initialCards;

        if (count) {
            return cards.slice(0, count);
        }
        return cards;
    }

    function getCard(cards, index = 0) {
        const { id, front, back } = cards[index];

        return {
            index,
            id,
            front,
            back,
            answerRevealed: false,
            frontSideVisible: true
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
        score.isLast = score.levels[4].length === initialCards.length;
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

    function initNextLevel(oldScore, nextCards) {
        const cards = settings.randomize.value ? shuffleArray(nextCards) : nextCards;

        setState({
            score: resetScoreCounter(oldScore),
            card: getCard(cards),
            cards,
            wasLastCard: false
        });
    }

    function initNextStandardRound() {
        const nextCards = getNextLevelCards(cards, score.incorrectIds);

        score.currentLevel += 1;
        score.incorrectIds.length = 0;
        initNextLevel(score, nextCards);
    }

    function initNextLeitnerLevel() {
        const { levels } = score;
        const index = levels.findIndex(level => level.length);
        const cards = getNextLevelCards(initialCards, levels[index]);
        score.currentLevel = index;

        initNextLevel(score, cards);
    }

    function revealAnswer() {
        let newScore = score;
        card.answerRevealed = true;
        card.frontSideVisible = false;

        if (card.back.type === "multi") {
            newScore = updateScore(card.back.correct === state.selectedOption);
        }
        setState({ card, score: newScore });
    }

    function selectOption({ target }) {
        setState({ selectedOption: parseInt(target.getAttribute("data-index"), 10) });
    }

    function nextStep(correct) {
        const index = card.index + 1;
        const wasLastCard = index === cards.length;
        let nextCard = null;
        let newScore = score;

        if (!wasLastCard) {
            nextCard = getCard(cards, index);
        }

        if (typeof correct === "boolean") {
            newScore = updateScore(correct);
        }
        setState({
            wasLastCard,
            score: newScore,
            card: nextCard
        });
    }

    function flipSide() {
        card.frontSideVisible = !card.frontSideVisible;
        setState({ card });
    }

    if (state.wasLastCard) {
        return (
            <StudyDeckScore
                score={score}
                title={title}
                mode={settings.studyMode.value}
                initNextStandardRound={initNextStandardRound}
                initNextLeitnerLevel={initNextLeitnerLevel}>
            </StudyDeckScore>
        );
    }
    else if (!card) {
        return null;
    }
    return (
        <Fragment>
            <h1 className="component-header study-deck-title">{title}</h1>
            <div className="study-container">
                <StudyDeckHeader score={score} mode={settings.studyMode.value} />
                <Card card={card}
                    revealAnswer={revealAnswer}
                    flipSide={flipSide}
                    selectOption={selectOption}
                />
            </div>
            <div className="container-footer">
                <span className="study-progress">Progress: {card.index + 1}/{cards.length}</span>
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
    );
}
