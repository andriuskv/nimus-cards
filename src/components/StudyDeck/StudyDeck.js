import React, { useState, useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import "./study-deck.scss";
import { shuffleArray, setDocumentTitle, getCardsToLearn, getCardsToReview, getRandomString } from "../../helpers";
import { fetchDeck, saveDeck } from "../../services/db";
import { getGlobalSettings } from "../../services/settings";
import Icon from "../Icon";
import Modal from "../Modal";
import NoMatch from "../NoMatch";
import StudyDeckHeader from "./StudyDeckHeader";
import StudyDeckScore from "./StudyDeckScore";
import StudyNotes from "./StudyNotes";
import Card from "./StudyCard";
import Timer from "./Timer";

export default function StudyDeck() {
  const history = useHistory();
  const match = useRouteMatch();
  const [state, setState] = useState(null);
  const nextStepTimeout = useRef(0);
  const { location } = history;

  useEffect(() => {
    const reload = new URLSearchParams(location.search).get("reload");

    if (reload === "1") {
      history.replace({
        pathname: location.pathname,
        search: "",
        state: { reloaded: true }
      });
      init();
    }
    else if (!location.state?.reloaded) {
      init();
    }
  }, [location.pathname + location.search]);

  function init() {
    const mode = match.url.split("/")[3];

    if (mode === "preview") {
      if (location.state?.title) {
        initDeck(location.state, "preview");
      }
      else {
        setState({ error: true });
      }
      return;
    }
    fetchDeck(match.params.id).then(deck => {
      if (deck) {
        initDeck(deck);
      }
      else {
        setState({ error: true });
      }
    });
  }

  function getSettings(deck, mode) {
    if (mode === "preview") {
      return {
        ...getGlobalSettings(),
        randomize: { value: false },
        cardCount: { value: 0 }
      };
    }
    else if (!deck.settings || deck.settings.useGlobalSettings.value) {
      return getGlobalSettings();
    }
    return deck.settings;
  }

  function initDeck(deck, mode = match.url.split("/")[3]) {
    let { cards } = deck;

    if (mode === "learn") {
      cards = getCardsToLearn(cards);

      if (!cards.length) {
        setState({ message: "You learned all available cards, come back later for a review." });
        return;
      }
    }
    else if (mode === "review") {
      cards = getCardsToReview(cards);

      if (!cards.length) {
        setState({ message: "You have nothing to review at this moment, come back later." });
        return;
      }
    }
    const settings = getSettings(deck, mode);
    cards = settings.randomize.value ? shuffleArray(cards) : cards;
    const sessionCards = cards.slice(0, settings.cardCount.value || cards.length).map(card => {
      card.score = card.score || {
        streak: 0,
        right: 0,
        wrong: 0,
        total: 0
      };
      return card;
    });
    const card = mode === "preview" ? cards[deck.selectedCardIndex] : getCard(sessionCards);

    setState({
      mode,
      deck,
      settings,
      sessionStartedAt: Date.now(),
      cardCount: sessionCards.length,
      cards: sessionCards,
      card,
      score: {
        right: 0,
        wrong: 0,
        total: 0
      }
    });
    setDocumentTitle(deck.title);
  }

  function getCard(cards) {
    const [card] = cards;

    if (card.back.type === "multi") {
      card.back.typeOptions.options = shuffleArray(card.back.typeOptions.options);
    }
    return { ...card };
  }

  function updateScoreCounter(isCorrect) {
    const { score } = state;

    if (isCorrect) {
      score.right += 1;
    }
    else {
      score.wrong += 1;
    }
    score.total = score.right + score.wrong;
    return score;
  }

  function timerRevealAnswer() {
    nextStep(false, { timerReveal: true });
  }

  function revealAnswer() {
    const card = { ...state.card };
    card.revealed = true;
    setState({ ...state, card });
  }

  function selectOption(id) {
    if (state.card.revealed) {
      return;
    }
    nextStep(id === state.card.back.typeOptions.correctId);
  }

  function adjustCardLevel(card, isCorrect) {
    const currentLevel = card.level || 0;
    let nextLevel = currentLevel;

    if (isCorrect) {
      nextLevel = currentLevel < 8 ? currentLevel + 1 : 8;
    }
    else {
      card.frozen = true;
      nextLevel = 1;
    }
    const hours = 6 * Math.pow(2, nextLevel - 1) * nextLevel;

    card.level = nextLevel;
    card.nextReview = Date.now() + hours * 60 * 60 * 1000;
  }

  function updateCardScore(card, isCorrect) {
    if (isCorrect) {
      card.score.streak += 1;
      card.score.right += 1;
    }
    else {
      card.frozen = true;
      card.score.streak = 0;
      card.score.wrong += 1;
    }
    card.score.total = card.score.right + card.score.wrong;
  }

  function updateCard(id, isCorrect) {
    const card = state.deck.cards.find(deck => deck.id === id);

    if (card.frozen) {
      return;
    }
    adjustCardLevel(card, isCorrect);
    updateCardScore(card, isCorrect);
  }

  function nextStep(isCorrect, params = {}) {
    const currentCard = state.mode === "preview" ? state.cards[state.deck.selectedCardIndex] : state.cards.shift();
    const revealedCard = {
      ...currentCard,
      ...params,
      isCorrect,
      revealed: true,
      finished: true
    };

    if (state.mode === "learn" || state.mode === "review") {
      updateCard(currentCard.id, isCorrect);
    }

    if (isCorrect) {
      state.sessionCardIds = [...(state.sessionCardIds || []), currentCard.id];
    }
    else if (state.mode !== "preview") {
      // Change attachment id to make it rerender.
      currentCard.attachmentId = getRandomString();
      state.cards.push(currentCard);
      state.cards = state.settings.randomize.value ? shuffleArray(state.cards) : state.cards;
    }
    setState({
      ...state,
      card: revealedCard,
      score: updateScoreCounter(isCorrect)
    });
    nextStepTimeout.current = setTimeout(state.mode === "preview" ? getNextPreviewCard: getNextCard, 1600);
  }

  function getNextPreviewCard() {
    const index = (state.deck.selectedCardIndex + 1) % state.cards.length;
    state.deck.selectedCardIndex = index;

    setState({ ...state, card: state.cards[index] });
  }

  function getNextCard() {
    const { cards, mode } = state;
    const wasLastCard = !cards.length;

    if (wasLastCard && (mode === "learn" || mode === "review")) {
      state.deck.cards = state.deck.cards.map(card => {
        delete card.frozen;
        return card;
      });
      saveDeck(state.deck);
    }
    setState({
      ...state,
      wasLastCard,
      card: wasLastCard ? null : getCard(cards)
    });
  }

  function skipNextStepTimeout() {
    clearTimeout(nextStepTimeout.current);

    if (state.mode === "preview") {
      getNextPreviewCard();
    }
    else {
      getNextCard();
    }
  }

  function handleStudyExit() {
    if (state.mode === "learn" || state.mode === "review") {
      setState({ ...state, exitModalVisible: true });
    }
    else if (state.mode === "preview") {
      history.push({
        pathname: `/decks/${state.deck.id}/${state.deck.type}`,
        state: state.deck
      });
    }
    else {
      history.push("/decks");
    }
  }

  function exitStudy(save) {
    if (save) {
      saveDeck(state.deck);
    }
    history.push("/decks");
  }

  function hideExitModal() {
    setState({ ...state, exitModalVisible: false });
  }

  function selectCard(index) {
    const card = state.cards[index];
    state.deck.selectedCardIndex = index;

    setState({ ...state, card });
  }

  function renderStudyHeader() {
    if (state.wasLastCard) {
      return (
        <div className="study-header">
          <h1 className="study-header-title">{state.deck.title}</h1>
        </div>
      );
    }
    return (
      <div className={`study-header${state.settings.timeoutDuration.value > 0 ? " has-timer" : ""}`}>
        <div className="study-progress" style={{
          transform: `scaleX(${(state.cardCount - state.cards.length) / state.cardCount})`
        }}></div>
        <button className="btn btn-icon study-exit-btn" onClick={handleStudyExit} title="Exit">
          <Icon name="close"/>
        </button>
        <h1 className="study-header-title">{state.deck.title}</h1>
        {state.mode === "preview" && <Icon name="preview" className="study-preview-icon" title="In preview mode"/>}
        {!state.card.finished && state.settings.timeoutDuration.value > 0 && (
          <Timer revealed={state.card.revealed}
            initDuration={state.settings.timeoutDuration.value}
            callback={timerRevealAnswer}/>
        )}
      </div>
    );
  }

  if (!state) {
    return null;
  }
  else if (state.error || state.message) {
    return <NoMatch message={state.message}/>;
  }
  return (
    <>
      {renderStudyHeader()}
      {state.wasLastCard ? (
        <StudyDeckScore score={state.score}
          deck={state.deck}
          startTime={state.sessionStartedAt}
          ids={state.sessionCardIds}/>
      ) : (
        <>
          <StudyDeckHeader score={state.score}/>
          {state.mode === "preview" && (
            <ul className="study-card-select">
              {state.cards.map((_, index) => (
                <li className="study-card-select-item" key={index}>
                  <button className={`btn btn-text study-card-select-btn${index === state.deck.selectedCardIndex ? " active": ""}`} onClick={() => selectCard(index)}>{index + 1}</button>
                </li>
              ))}
            </ul>
          )}
          <Card card={state.card}
            selectOption={selectOption}
            revealAnswer={revealAnswer}
            skipNextStepTimeout={skipNextStepTimeout}
            nextStep={nextStep}/>
          {state.card.notes?.value && <StudyNotes notes={state.card.notes}/>}
        </>
      )}
      {state.exitModalVisible && (
        <Modal hide={hideExitModal}>
          <h3 className="modal-title">Do you want to save your progress?</h3>
          <div className="study-exit-modal-btns">
            <button className="btn btn-text study-exit-modal-btn"
              onClick={() => exitStudy(true)}>Save and Exit</button>
            <button className="btn btn-text study-exit-modal-btn"
              onClick={() => exitStudy(false)}>Exit Without Saving</button>
          </div>
        </Modal>
      )}
    </>
  );
}
