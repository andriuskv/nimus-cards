import React, { useEffect, useState } from "react";
import "./create-deck.scss";
import cloneDeep from "lodash.clonedeep";
import { getRandomString, setDocumentTitle, shuffleArray } from "../../helpers";
import { useStore, CreateDeckProvider } from "../../context/CreateDeckContext";
import { fetchDeck, saveDeck } from "../../services/db";
import Icon from "../Icon";
import Card from "./CreateCard";

function CreateDeck(props) {
  const { state, dispatch } = useStore();
  const [formMessage, setFormMessage] = useState("");
  const [pendingCards, setPendingCards] = useState([]);
  let messageTimeout = 0;
  let undoTimeout = 0;

  useEffect(() => {
    const { id } = props.match.params;

    if (props.match.path === "/decks/create") {
      dispatch({ type: "RESET_DECK", deck: getInitialDeck() });
      setDocumentTitle("Create a new deck");
    }
    else if (id) {
      fetchDeck(id).then(deck => {
        if (deck) {
          deck.selectedCardIndex = 0;
          deck.cards = deck.cards.map(card => {
            card.back = {
              ...getNewCard().back,
              ...card.back,
              type: card.back.type,
              [`${card.back.type}Options`]: card.back.typeOptions
            };
            delete card.back.typeOptions;
            return card;
          });
          dispatch({ type: "RESET_DECK", deck });
          setDocumentTitle(`Editing ${deck.title}`);
        }
      });
    }
  }, []);

  useEffect(() => {
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
      setFormMessage("");
    }, 3200);

    return () => {
      clearTimeout(messageTimeout);
    };
  }, [formMessage]);

  useEffect(() => {
    clearTimeout(undoTimeout);

    if (pendingCards.length > 0) {
      undoTimeout = setTimeout(() => {
        setPendingCards([]);
      }, 8000);
    }
    return () => {
      clearTimeout(undoTimeout);
    };
  }, [pendingCards.length]);

  function getInitialDeck() {
    return {
      id: getRandomString(),
      title: "",
      description: "",
      selectedCardIndex: 0,
      cards: [getNewCard(), getNewCard()]
    };
  }

  function getNewCard() {
    return {
      id: getRandomString(),
      front: {
        text: "",
        textSize: 16
      },
      back: {
        type: "text",
        textOptions: {
          value: "",
          textSize: 16
        },
        multiOptions: {
          correctId: "",
          layout: "short",
          options: [
            { id: getRandomString() },
            { id: getRandomString() }
          ]
        },
        exactOptions: {
          caseSensitive: false,
          value: ""
        }
      },
      notes: {
        value: ""
      },
      score: {
        streak: 0,
        right: 0,
        wrong: 0,
        total: 0
      }
    };
  }

  function addCard() {
    const lastCard = state.cards[state.cards.length - 1];
    const card = getNewCard();

    card.front.textSize = lastCard.front.textSize;
    card.back.type = lastCard.back.type;

    if (card.back.type === "text") {
      card.back.textOptions.textSize = lastCard.back.textOptions.textSize;
    }
    else if (card.back.type === "multi") {
      card.back.multiOptions.layout = lastCard.back.multiOptions.layout;
    }
    else if (card.back.type === "exact") {
      card.back.exactOptions.caseSensitive = lastCard.back.exactOptions.caseSensitive;
    }
    dispatch({ type: "ADD_CARD", card });
  }

  function previewCard(card) {
    if (isFrontValid(card.front) && isBackValid(card.back)) {
      card.visible = true;
      card.back.typeOptions = card.back[`${card.back.type}Options`];

      if (card.back.type === "multi") {
        card.back.typeOptions.options = shuffleArray(card.back.multiOptions.options.filter(({ value }) => value));
      }
    }
    else {
      card.message = "Can't preview invalid card";

      setTimeout(() => {
        delete card.message;
        dispatch({ type: "PREVIEW_CARD", card });
      }, 2400);
    }
    dispatch({ type: "PREVIEW_CARD", card });
  }

  function cloneCard(index) {
    const cloneCard = cloneDeep(state.cards[index]);
    cloneCard.id = getRandomString();

    dispatch({ type: "INSERT_CARD", index: index + 1, card: cloneCard });
  }

  function swapCard(index, direction) {
    const targetIndex = index + direction;

    dispatch({ type: "SWAP_CARD", index, targetIndex });
  }

  function removeCard(index) {
    const card = state.cards[index];

    if (isFrontValid(card.front) || isBackValid(card.back) || card.notes.value) {
      setPendingCards([...pendingCards, card]);
    }
    dispatch({ type: "REMOVE_CARD", index });
  }

  function undoCardRemoval() {
    clearTimeout(undoTimeout);
    setPendingCards([]);
    dispatch({
      type: "RESET_DECK",
      deck: {
        ...state,
        cards: state.cards.concat(pendingCards)
      }
    });
  }

  function isFrontValid(side) {
    if (side.attachment) {
      return !!side.attachment.description;
    }
    return !!side.text;
  }

  function isBackValid(side, checkIfEmpty = false) {
    if (side.type === "text") {
      return side.textOptions.value.length > 0;
    }
    else if (side.type === "exact") {
      return side.exactOptions.value.length > 0;
    }
    const validOptionCount = side.multiOptions.options.reduce((acc, { value }) => {
      if (value) {
        acc += 1;
      }
      return acc;
    }, 0);

    if (checkIfEmpty) {
      return validOptionCount > 0;
    }
    return validOptionCount > 1 && side.multiOptions.correctId;
  }

  function validateCards(cards) {
    let validCardCount = 0;

    for (const { front, back } of cards) {
      if (isFrontValid(front) && isBackValid(back)) {
        validCardCount += 1;
      }
    }

    if (validCardCount !== cards.length) {
      setFormMessage("Please fill in both card sides");
    }
    else if (validCardCount < 2) {
      setFormMessage("Please fill in at least two cards");
    }
    else {
      return true;
    }
  }

  function handleChange({ target }) {
    const { name, value } = target;

    dispatch({ type: "UPDATE_DECK", name, value });
  }

  function selectCard(index) {
    if (index !== state.selectedCardIndex) {
      dispatch({ type: "SELECT_CARD", index });
    }
  }

  function cleanupCards(cards) {
    return cards.map(card => {
      const back = {
        type: card.back.type,
        typeOptions: card.back[`${card.back.type}Options`]
      };

      if (card.modified) {
        delete card.score;
        delete card.level;
        delete card.nextReview;
      }
      delete card.modified;

      if (back.type === "multi") {
        back.typeOptions.options = card.back.multiOptions.options.filter(({ value }) => value);
      }
      card.back = back;
      return card;
    });
  }

  function filterCards(cards) {
    return cards.filter(card => isFrontValid(card.front) || isBackValid(card.back, true));
  }

  function handleSubmit() {
    if (!state.title) {
      setFormMessage("Title is required");
      return;
    }
    const cards = filterCards(state.cards);
    const valid = validateCards(cards);

    if (valid) {
      state.cards = cleanupCards(cards);
      state.createdAt = state.createdAt || new Date();
      props.history.push("/decks");
      saveDeck(state);
    }
  }

  if (!state) {
    return null;
  }
  return (
    <>
      <label className="deck-form-field">
        <div className="deck-form-field-title">TITLE</div>
        <input className="input deck-form-field-input"
          name="title"
          value={state.title}
          onChange={handleChange}/>
      </label>
      <label className="deck-form-field">
        <div className="deck-form-field-title">DESCRIPTION</div>
        <input className="input deck-form-field-input"
          name="description"
          value={state.description}
          onChange={handleChange}/>
      </label>
      <ul className="create-card-select">
        {state.cards.map((_, index) => (
          <li className="create-card-select-item" key={index}>
            <button className={`btn btn-text create-card-select-btn${index === state.selectedCardIndex ? " active": ""}`} onClick={() => selectCard(index)}>{index + 1}</button>
          </li>
        ))}
        <li className="create-card-select-item">
          <button onClick={addCard} className="btn btn-icon create-card-select-btn create-card-add-btn" title="Add Card">
            <Icon name="plus"/>
          </button>
        </li>
      </ul>
      <Card index={state.selectedCardIndex} card={state.cards[state.selectedCardIndex]}
        length={state.cards.length}
        previewCard={previewCard}
        cloneCard={cloneCard}
        swapCard={swapCard}
        removeCard={removeCard}/>
      {pendingCards.length > 0 && (
        <div className="deck-form-dialog">
          <span>Removed {pendingCards.length} card{pendingCards.length > 1 ? "s" : ""}</span>
          <button className="btn btn-text" onClick={undoCardRemoval}>UNDO</button>
        </div>
      )}
      <div className="create-footer">
        {formMessage && <span className="create-message">{formMessage}</span>}
        <button className="btn" onClick={handleSubmit}>Create</button>
      </div>
    </>
  );
}

export default function CreateDeckContainer(props) {
  return (
    <CreateDeckProvider>
      <CreateDeck {...props}/>
    </CreateDeckProvider>
  );
}
