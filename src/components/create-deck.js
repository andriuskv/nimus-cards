import React, { Fragment, useState, useEffect } from "react";
import { getRandomString } from "../helpers";
import { fetchDecks } from "../services/db";
import Card from "./create-card/create-card";

export default function CreateDeck(props) {
    const [deck, setDeck] = useState(getDeck(props.location.state));
    const [formMessage, setFormMessage] = useState("");
    let messageTimeout = 0;

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
        const { id } = props.match.params;

        if (id && !props.location.state) {
            fetchDecks().then(decks => {
                const deck = findDeck(decks, id);

                if (deck) {
                    setDeck(deck);
                }
            });
        }
    }, []);

    function findDeck(decks, deckId) {
        return decks.find(({ id }) => id === deckId);
    }

    function getDeck(deck = {}) {
        return {
            id: getRandomString(),
            title: "",
            description: "",
            cards: [getNewCard()],
            ...deck
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
                text: "",
                textSize: 16,
                correct: 0,
                options: [
                    { id: getRandomString() },
                    { id: getRandomString() }
                ]
            }
        };
    }

    function addCard() {
        const lastCard = deck.cards[deck.cards.length - 1];
        const card = getNewCard();

        if (lastCard) {
            card.front.textSize = lastCard.front.textSize;
            card.back.textSize = lastCard.back.textSize;
            card.back.type = lastCard.back.type;
        }
        deck.cards.push(card);
        setDeck({ ...deck });
    }

    function removeCard(index) {
        deck.cards.splice(index, 1);
        setDeck({ ...deck });
    }

    function isFrontValid(side) {
        return side.text || side.attachment;
    }

    function isBackValid(side) {
        if (side.type === "text") {
            return side.text.length > 0;
        }
        const validOptionCount = side.options.reduce((acc, { text }) => {
            if (text) {
                acc += 1;
            }
            return acc;
        }, 0);
        return validOptionCount > 1;
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
        deck[name] = value;
        setDeck({ ...deck });
    }

    function cleanupCards(cards) {
        return cards.map(card => {
            if (card.back.type === "text") {
                card.back.correct = 0;
                card.back.options = card.back.options.slice(0, 2).map((option => {
                    option.text = "";
                    return option;
                }));
            }
            else {
                card.back.text = "";
                card.back.options = card.back.options.filter(({ text }) => text);
            }
            return card;
        });
    }

    function handleSubmit() {
        if (!deck.title) {
            setFormMessage("Title is required");
            return;
        }
        const valid = validateCards(deck.cards);

        if (valid) {
            deck.cards = cleanupCards(deck.cards);
            props.history.push({
                pathname: "/decks",
                state: deck
            });
        }
    }

    return (
        <Fragment>
            <div className="create-input-group">
                <label className="create-input-label">
                    <div className="side-name">title</div>
                    <input className="input create-title-input"
                        name="title"
                        value={deck.title}
                        onChange={handleChange} />
                </label>
                <label className="create-input-label">
                    <div className="side-name">description (optional)</div>
                    <textarea className="input side-text create-description-input"
                        name="description"
                        value={deck.description}
                        onChange={handleChange}></textarea>
                </label>
            </div>
            {deck.cards.length ?
                <ul>
                    {deck.cards.map((card, index) => (
                        <Card key={card.id} index={index} card={card}
                            removeCard={removeCard} />
                    ))}
                </ul> :
                <p className="create-deck-message">Deck is empty</p>
            }
            <div className="container-footer create-footer">
                <button className="btn" onClick={addCard}>New Card</button>
                {formMessage && <span className="create-message">{formMessage}</span>}
                <button className="btn" onClick={handleSubmit}>Create</button>
            </div>
        </Fragment>
    );
}
