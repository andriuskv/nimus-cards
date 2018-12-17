import React from "react";
import Card from "./create-card/create-card";

export default class CreateDeck extends React.Component {
    state = {
        deck: this.getDeck(this.props.location.state)
    };
    messageTimeout = 0;

    componentWillUnmount() {
        clearTimeout(this.messageTimeout);
    }

    getRandomString() {
        return Math.random().toString(32).slice(2, 10);
    }

    getDeck(state = {}) {
        return {
            id: this.getRandomString(),
            title: "",
            description: "",
            cards: [this.getNewCard()],
            ...state
        };
    }

    showMessage(message) {
        this.setState({ message });

        clearTimeout(this.messageTimeout);
        this.messageTimeout = setTimeout(() => {
            this.setState({ message: "" });
        }, 3200);
    }

    handleChange = event => {
        const { name, value } = event.target;
        const { deck } = this.state;
        deck[name] = value;

        this.setState({ deck });
    }

    handleSubmit = () => {
        const { deck } = this.state;

        if (!deck.title) {
            this.showMessage("Title is required");
            return;
        }
        const valid = this.validateCards(deck.cards);

        if (valid) {
            this.props.history.push({
                pathname: "/decks",
                state: deck
            });
        }
    }

    hasSideContent(side) {
        return side.text || side.attachment;
    }

    validateCards(cards) {
        let validCardCount = 0;

        for (const { front, back } of cards) {
            const frontSideFull = this.hasSideContent(front);
            const backSideFull = this.hasSideContent(back);

            if (frontSideFull && backSideFull) {
                validCardCount += 1;
            }
        }

        if (!validCardCount) {
            this.showMessage("Please fill in at least two cards");
        }
        else if (validCardCount !== cards.length) {
            this.showMessage("Please fill in both card sides");
        }
        else {
            return true;
        }
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
                        <input className="input create-title-input"
                            name="title"
                            value={deck.title}
                            onChange={this.handleChange} />
                    </label>
                    <label className="create-input-label">
                        <div className="side-name">description (optional)</div>
                        <textarea className="input side-text create-description-input"
                            name="description"
                            value={deck.description}
                            onChange={this.handleChange}></textarea>
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
