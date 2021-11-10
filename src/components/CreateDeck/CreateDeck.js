import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./create-deck.scss";
import cloneDeep from "lodash.clonedeep";
import { getRandomString, setDocumentTitle } from "../../helpers";
import { fetchDeck, saveDeck } from "../../services/db";
import Header from "../Header";
import Icon from "../Icon";
import NoMatch from "../NoMatch";
import CardFront from "./CreateCardFront";
import CardBack from "./CreateCardBack";
import CardNotes from "./CardNotes";

export default function CreateDeck() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [state, setState] = useState(null);
  const [pendingCards, setPendingCards] = useState([]);
  let undoTimeout = 0;

  useEffect(() => {
    if (location.state) {
      const deck = location.state;
      deck.cards = parseCards(deck.cards);

      setState(deck);
      setDocumentTitle(deck.type === "edit" ? `Editing ${deck.title}` : "Create a new deck");
    }
    else if (location.pathname === "/decks/create") {
      setState(getInitialDeck());
      setDocumentTitle("Create a new deck");
    }
    else if (params.id) {
      fetchDeck(params.id).then(deck => {
        if (!deck) {
          setState({ error: true });
          return;
        }
        deck.type = "edit";
        deck.makingEdit = true;
        deck.selectedCardIndex = 0;
        deck.cards = parseCards(deck.cards);

        setState(deck);
        setDocumentTitle(`Editing ${deck.title}`);
      });
    }
  }, []);

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
      type: "create",
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
        text: ""
      },
      back: {
        type: "text",
        textOptions: {
          value: ""
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

  function parseCards(cards) {
    return cards.map(card => {
      const { back } = getNewCard();
      card.back = {
        ...back,
        ...card.back,
        [`${card.back.type}Options`]: card.back.typeOptions
      };

      delete card.back.typeOptions;
      return card;
    });
  }

  function selectCard(index) {
    if (index !== state.selectedCardIndex) {
      setState({ ...state, selectedCardIndex: index });
    }
  }

  function addCard() {
    const lastCard = state.cards[state.cards.length - 1];
    const card = getNewCard();

    card.back.type = lastCard.back.type;

    if (card.back.type === "multi") {
      card.back.multiOptions.layout = lastCard.back.multiOptions.layout;
    }
    else if (card.back.type === "exact") {
      card.back.exactOptions.caseSensitive = lastCard.back.exactOptions.caseSensitive;
    }
    setState({ ...state, cards: [...state.cards, card] });
  }

  function swapCard(index, direction) {
    const targetIndex = index + direction;
    const cards = state.cards;
    [cards[index], cards[targetIndex]] = [cards[targetIndex], cards[index]];

    setState({ ...state });
  }

  function cloneCard(index) {
    const cloneCard = cloneDeep(state.cards[index]);
    cloneCard.id = getRandomString();
    state.selectedCardIndex = index;

    state.cards.splice(index, 0, cloneCard);
    setState({ ...state });
  }

  function removeCard(index) {
    const card = state.cards[index];

    if (isFrontValid(card.front) || isBackValid(card.back) || card.notes.value) {
      setPendingCards([...pendingCards, card]);
    }
    state.selectedCardIndex = index > 0 ? index - 1 : 0;
    state.cards.splice(index, 1);
    setState({ ...state });
  }

  function undoCardRemoval() {
    setPendingCards([]);
    setState({
      ...state,
      cards: state.cards.concat(pendingCards)
    });
  }

  function handleChange({ target }) {
    const { name, value } = target;
    state[name] = value;

    if (name === "title" && state.missingTitle) {
      delete state.missingTitle;
    }
    setState({ ...state });
  }

  function handleCardFrontTextChange({ target }) {
    const { value } = target;
    const card = state.cards[state.selectedCardIndex];

    if (value !== card.front.text) {
      card.front.text = value;
      card.modified = true;

      if (card.front.error?.textMessage) {
        delete card.front.error.textMessage;
      }
      setState({ ...state });
    }
  }

  function handleCardNotesChange({ target }) {
    const { value } = target;
    const card = state.cards[state.selectedCardIndex];

    if (value !== card.notes.value) {
      card.notes.value = value;
      setState({ ...state });
    }
  }

  function addAttachment(attachment) {
    const card = state.cards[state.selectedCardIndex];
    card.modified = true;
    card.front.attachment = attachment;

    delete card.front.error;
    setState({ ...state });
  }

  function removeAttachment() {
    const card = state.cards[state.selectedCardIndex];
    card.modified = true;

    delete card.front.attachment;
    delete card.front.error;
    setState({ ...state });
  }

  function updateAttachmentDescription({ target }) {
    const card = state.cards[state.selectedCardIndex];
    card.modified = true;
    card.front.attachment.description = target.value;

    if (card.front.error?.attachmentMessage) {
      delete card.front.error;
    }
    setState({ ...state });
  }

  function updateCardBack(payload) {
    const card = state.cards[state.selectedCardIndex];
    card.modified = true;
    card.back = { ...card.back, ...payload };

    delete card.back.error;
    setState({ ...state });
  }

  function isFrontValid(side) {
    if (side.attachment) {
      return !!side.attachment.description;
    }
    return !!side.text;
  }

  function validateMultiType(options) {
    const validOptionCount = options.options.reduce((acc, { value }) => {
      if (value) {
        acc += 1;
      }
      return acc;
    }, 0);

    return {
      validOptionCount,
      correctId: options.correctId
    };
  }

  function isBackValid(side) {
    if (side.type === "text") {
      return side.textOptions.value.length > 0;
    }
    else if (side.type === "exact") {
      return side.exactOptions.value.length > 0;
    }
    const { validOptionCount, correctId } = validateMultiType(side.multiOptions);

    return validOptionCount > 1 && correctId;
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
      delete card.invalid;
      delete card.valid;

      if (back.type === "multi") {
        back.typeOptions.options = card.back.multiOptions.options.filter(({ value }) => value);
      }
      card.back = back;
      return card;
    });
  }

  function validateCards(cards) {
    let validCardCount = 0;

    for (const card of cards) {
      let validSideCount = 0;
      card.valid = false;
      card.invalid = false;

      if (!isFrontValid(card.front)) {
        card.front.error = card.front.error || {};
        const { text, attachment, error } = card.front;

        if (attachment && !attachment.description) {
          error.attachmentMessage = "Please provide attachment description.";
        }
        else if (!text) {
          error.textMessage = "Please fill in the text field or provide an attachment.";
        }
      }
      else {
        validSideCount += 1;
        delete card.front.error;
      }

      if (!isBackValid(card.back)) {
        card.back.error = card.back.error || {};
        const { type, textOptions, exactOptions, multiOptions, error } = card.back;

        if (type === "text" && !textOptions.value) {
          error.message = "Please fill in the text field.";
        }
        else if (type === "exact" && !exactOptions.value) {
          error.message = "Please provide an answer.";
        }
        else if (type === "multi") {
          const { validOptionCount, correctId } = validateMultiType(multiOptions);

          if (validOptionCount < 2) {
            error.message = "Please fill in at least 2 options.";
          }
          else if (!correctId) {
            error.message = "Please select correct option.";
          }
        }
      }
      else {
        validSideCount += 1;
        delete card.back.error;
      }

      if (validSideCount === 2) {
        validCardCount += 1;
        card.valid = true;
      }
      else {
        card.invalid = true;
      }
    }

    if (validCardCount < 2) {
      state.globalMessage = "Please fill in at least 2 cards.";
    }
    else {
      state.globalMessage = "";
    }
    return validCardCount === cards.length;
  }

  function handleSubmit(type) {
    if (!state.title) {
      state.missingTitle = true;
    }
    const cardsValid = validateCards(state.cards);

    if (state.title && cardsValid) {
      state.cards = cleanupCards(state.cards);

      if (type === "preview") {
        navigate(`/decks/${state.id}/preview`, { state });
      }
      else {
        const currentDate = Date.now();

        delete state.type;
        delete state.selectedCardIndex;

        if (state.createdAt) {
          state.modifiedAt = currentDate;
        }
        else {
          state.createdAt = currentDate;
        }
        navigate("/decks");
        saveDeck(state);
      }
    }
    else {
      setState({ ...state });
    }
  }

  function previewDeck() {
    handleSubmit("preview");
  }

  if (!state) {
    return null;
  }
  else if (state.error) {
    return <NoMatch/>;
  }
  const index = state.selectedCardIndex;
  const length = state.cards.length;
  const card = state.cards[index];

  return (
    <>
      <Header/>
      <div className="container max-width-limit">
        <label className="create-field">
          <div className="create-field-title">Title</div>
          <input className="input create-field-input"
            name="title" value={state.title}
            onChange={handleChange}/>
          {state.missingTitle && <div className="create-field-input-message">Please provide title for your deck.</div>}
        </label>
        <label className="create-field">
          <div className="create-field-title">Description</div>
          <input className="input create-field-input"
            name="description" value={state.description}
            onChange={handleChange}/>
        </label>
        <ul className="create-card-select">
          {state.cards.map((card, index) => (
            <li className="create-card-select-item" key={index}>
              <button className={`btn btn-text create-card-select-btn${index === state.selectedCardIndex ? " active": ""}${card.invalid ? " invalid": ""}${card.valid ? " valid": ""}`} onClick={() => selectCard(index)}>{index + 1}</button>
            </li>
          ))}
          <li className="create-card-select-item">
            <button onClick={addCard} className="btn btn-icon create-card-select-btn" title="Add Card">
              <Icon name="plus"/>
            </button>
          </li>
        </ul>
        <div className="create-card">
          <div className="create-card-header">
            <div className="create-card-index-container">
              <button className="btn btn-icon create-card-header-item" onClick={() => swapCard(index, -1)}
                title="Swap with the left card" disabled={index === 0}>
                <Icon name="chevron-left"/>
              </button>
              <div className="create-card-index">{index + 1}</div>
              <button className="btn btn-icon create-card-header-item" onClick={() => swapCard(index, 1)}
                title="Swap with the right card" disabled={index === length - 1}>
                <Icon name="chevron-right"/>
              </button>
            </div>
            <button className="btn btn-icon" title="Clone card" onClick={() => cloneCard(index)}>
              <Icon name="clone"/>
            </button>
            {length > 1 && (
              <button className="btn btn-icon create-card-remove-card-btn" title="Remove card" onClick={() => removeCard(index)}>
                <Icon name="remove"/>
              </button>
            )}
          </div>
          <div className="create-card-main" key={card.id}>
            <CardFront side={card.front}
              addAttachment={addAttachment}
              removeAttachment={removeAttachment}
              updateAttachmentDescription={updateAttachmentDescription}
              handleChange={handleCardFrontTextChange}/>
            <CardBack side={card.back} updateCardBack={updateCardBack}/>
          </div>
          <CardNotes value={card.notes.value} handleChange={handleCardNotesChange}/>
        </div>
        {pendingCards.length > 0 && (
          <div className="create-undo-dialog">
            <span>Removed {pendingCards.length} card{pendingCards.length > 1 ? "s" : ""}</span>
            <button className="btn btn-text create-dialog-undo-btn" onClick={undoCardRemoval}>UNDO</button>
          </div>
        )}
        <div className="create-footer">
          {state.globalMessage && <span className="create-message">{state.globalMessage}</span>}
          <button className="btn create-footer-btn" onClick={previewDeck}>Preview</button>
          <button className="btn create-footer-btn" onClick={handleSubmit}>{state.makingEdit ? "Update" : "Create" }</button>
        </div>
      </div>
    </>
  );
}

