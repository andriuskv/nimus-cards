import React from "react";
import Card from "./create-card/create-card";

export default class CreateDeck extends React.Component {
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

        if (lastCard) {
            card.front.textSize = lastCard.front.textSize;
            card.back.textSize = lastCard.back.textSize;
        }
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
        const { deck, message } = this.state;
        return (
            <React.Fragment>
                <div className="create-input-group">
                    <label className="create-input-label">
                        <div className="side-name">title</div>
                        <input id="js-deck-title" className="input create-title-input" defaultValue={deck.title} />
                    </label>
                    <label className="create-input-label">
                        <div className="side-name">description (optional)</div>
                        <textarea id="js-deck-description" className="input side-text create-description-input" defaultValue={deck.description}></textarea>
                    </label>
                </div>
                {deck.cards.length ?
                    <ul>
                        {deck.cards.map((card, index) => (
                            <Card key={card.id} index={index} card={card} removeCard={this.removeCard} />
                        ))}
                    </ul> :
                    <p className="create-deck-message">Deck is empty</p>
                }
                <div className="container-footer create-footer">
                    <button className="btn" onClick={this.addCard}>New Card</button>
                    {message && <span className="create-message">{message}</span>}
                    <button className="btn" onClick={this.handleSubmit}>Create</button>
                </div>
            </React.Fragment>
        );
    }
}
