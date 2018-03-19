import React from "react";
import CreateDeck from "../components/create-deck";

export default class CreateDeckContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deck: this.getDeck(props.location.state)
        };
        this.messageTimeout = 0;
    }

    getRandomString() {
        return Math.random().toString(32).slice(2, 10);
    }

    getDeck(state = {}) {
        return Object.assign({
            id: this.getRandomString(),
            title: "",
            description: "",
            cards: [this.getNewCard()]
        }, state);
    }

    showMessage(message) {
        this.setState({ message });

        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(() => {
            this.setState({ message: "" });
        }, 3200);
    }

    hasSideContent(side) {
        return side.text || side.attachment;
    }

    handleSubmit = () => {
        const { value: title } = document.getElementById("js-deck-title");
        const { value: description } = document.getElementById("js-deck-description");

        if (!title) {
            this.showMessage("Please specify deck title");
            return;
        }
        const deck = { ...this.state.deck };
        const containsEmptySide = deck.cards.some(({ front, back }) => {
            const isFrontEmpty = this.hasSideContent(front);
            const isBackEmpty = this.hasSideContent(back);

            return !isFrontEmpty && isBackEmpty || !isBackEmpty && isFrontEmpty;
        });
        deck.title = title;
        deck.description = description;

        if (!containsEmptySide) {
            deck.cards = deck.cards.filter(({ front, back }) => this.hasSideContent(front) || this.hasSideContent(back));

            if (deck.cards.length < 2) {
                this.showMessage("Please fill in at least two cards");
                return;
            }
            this.props.history.push({
                pathname: "/decks",
                state: deck
            });
            return;
        }
        this.showMessage("Please fill in both card sides");
    }

    getNewCard() {
        return {
            id: this.getRandomString(),
            front: {
                text: "",
                textSize: 16
            },
            back: {
                text: "",
                textSize: 16
            }
        };
    }

    addCard = ({ target }) => {
        const deck = { ...this.state.deck };
        const lastCard = deck.cards[deck.cards.length - 1];
        const card = this.getNewCard();

        card.front.textSize = lastCard.front.textSize;
        card.back.textSize = lastCard.back.textSize;

        deck.cards.push(card);

        this.setState({ deck }, () => {
            target.scrollIntoView();
        });
    }

    removeCard = index => {
        const deck = { ...this.state.deck };

        deck.cards.splice(index, 1);
        this.setState({ deck });
    }

    render() {
        return <CreateDeck
            deck={this.state.deck}
            message={this.state.message}
            handleSubmit={this.handleSubmit}
            addCard={this.addCard}
            removeCard={this.removeCard} />;
    }
}
