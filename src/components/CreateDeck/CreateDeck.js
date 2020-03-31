import React, { useRef, useEffect, useState } from "react";
import "./create-deck.scss";
import { useStore, CreateDeckProvider } from "../../context/CreateDeckContext";
import { getRandomString } from "../../helpers";
import { fetchDeck, saveDeck } from "../../services/db";
import Card from "./CreateCard";

function CreateDeck(props) {
    const { state, dispatch } = useStore();
    const [formMessage, setFormMessage] = useState("");
    const [pendingCards, setPendingCards] = useState([]);
    const newCardBtnRef = useRef();
    let messageTimeout = 0;
    let undoTimeout = 0;

    useEffect(() => {
        const { id } = props.match.params;

        if (props.match.path === "/decks/create") {
            dispatch({ type: "RESET_DECK", deck: getInitialDeck() });
        }
        else if (id) {
            fetchDeck(id).then(deck => {
                if (deck) {
                    deck.cards = deck.cards.map(card => {
                        const newCard = getNewCard();
                        newCard.front = card.front;
                        newCard.back.type = card.back.type;
                        newCard.back[`${card.back.type}Options`] = card.back.typeOptions;
                        newCard.notes = card.notes;
                        delete newCard.back.typeOptions;
                        return newCard;
                    });
                    dispatch({ type: "RESET_DECK", deck });
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
            studyMode: "standard",
            cards: [getNewCard()]
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
        requestAnimationFrame(() => {
            newCardBtnRef.current.scrollIntoView();
        });
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
        return side.text || side.attachment;
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

    function cleanupCards(cards) {
        return cards.map(card => {
            const back = {
                type: card.back.type,
                typeOptions: card.back[`${card.back.type}Options`]
            };

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
            const modeElements = document.querySelectorAll(".create-radio-input");
            state.studyMode = modeElements[0].checked ? "standard" : "leitner";
            state.cards = cleanupCards(cards);
            props.history.push("/decks");
            saveDeck(state);
        }
    }

    if (!state) {
        return null;
    }

    return (
        <React.Fragment>
            <div className="deck-form-field-group create-input-group">
                <label className="deck-form-title-input-container">
                    <div className="deck-form-field-title">TITLE</div>
                    <input className="input create-title-input"
                        name="title"
                        value={state.title}
                        onChange={handleChange} />
                </label>
                <label className="deck-form-desc-input-container">
                    <div className="deck-form-field-title">DESCRIPTION (OPTIONAL)</div>
                    <textarea className="input create-description-input"
                        name="description"
                        value={state.description}
                        onChange={handleChange}></textarea>
                </label>
                <div className="create-mode-setting">
                    <div className="deck-form-field-title">STUDY MODE</div>
                    <div className="create-radio-items">
                        <label className="radio-container create-radio-container">
                            <input type="radio" name="study-mode"
                                className="sr-only radio-input create-radio-input"
                                value="standard"
                                defaultChecked={state.studyMode === "standard"}/>
                            <div className="radio"></div>
                            <span className="radio-label">Standard</span>
                        </label>
                        <label className="radio-container create-radio-container">
                            <input type="radio" name="study-mode"
                                className="sr-only radio-input create-radio-input"
                                value="leitner"
                                defaultChecked={state.studyMode === "leitner"}/>
                            <div className="radio"></div>
                            <span className="radio-label">Leitner system</span>
                        </label>
                    </div>
                </div>
            </div>
            <ul>{state.cards.map((card, index) => (
                <Card key={card.id} index={index} card={card} removeCard={removeCard} />
            ))}</ul>
            {pendingCards.length > 0 && (
                <div className="deck-form-dialog">
                    <span>Removed {pendingCards.length} card{pendingCards.length > 1 ? "s" : ""}</span>
                    <button className="btn btn-text" onClick={undoCardRemoval}>UNDO</button>
                </div>
            )}
            <div className="create-footer">
                <button className="btn" onClick={addCard} ref={newCardBtnRef}>New Card</button>
                {formMessage && <span className="create-message">{formMessage}</span>}
                <button className="btn" onClick={handleSubmit}>Create</button>
            </div>
        </React.Fragment>
    );
}

export default function CreateDeckContainer(props) {
    return (
        <CreateDeckProvider>
            <CreateDeck {...props} />
        </CreateDeckProvider>
    );
}
