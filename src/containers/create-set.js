import React from "react";
import CreateSet from "../components/create-set";

export default class CreateSetContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            set: this.getSet(props.location.state)
        };
        this.messageTimeout = 0;
    }

    getRandomString() {
        return Math.random().toString(32).slice(2, 10);
    }

    getSet(state = {}) {
        return Object.assign({
            id: this.getRandomString(),
            title: "",
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
        const titleElement = document.getElementById("js-create-set-title");
        const title = titleElement.value.trim();

        if (!title) {
            this.showMessage("Please specify set title");
            titleElement.focus();
            return;
        }
        const set = Object.assign({}, this.state.set);
        const containsEmptySide = set.cards.some(({ front, back }) => {
            const isFrontEmpty = this.hasSideContent(front);
            const isBackEmpty = this.hasSideContent(back);

            return !isFrontEmpty && isBackEmpty || !isBackEmpty && isFrontEmpty;
        });
        set.title = title;

        if (!containsEmptySide) {
            set.cards = set.cards.filter(({ front, back }) => {
                return this.hasSideContent(front) || this.hasSideContent(back);
            });

            if (!set.cards.length) {
                this.showMessage("Please fill in at least one card");
                return;
            }
            this.props.history.push({
                pathname: "/flashcards",
                state: set
            });
            return;
        }
        this.showMessage("Please fill in both card sides");
    }

    getNewCard() {
        return {
            id: this.getRandomString(),
            front: {
                text: ""
            },
            back: {
                text: ""
            }
        };
    }

    addCard = ({ target }) => {
        const set = Object.assign({}, this.state.set);
        const lastCard = set.cards[set.cards.length - 1];
        const card = this.getNewCard();

        card.front.textSize = lastCard.front.textSize;
        card.back.textSize = lastCard.back.textSize;

        set.cards.push(card);

        this.setState({ set }, () => {
            target.scrollIntoView();
        });
    }

    removeCard = index => {
        const set = Object.assign({}, this.state.set);

        set.cards.splice(index, 1);
        this.setState({ set });
    }

    render() {
        return <CreateSet
            set={this.state.set}
            message={this.state.message}
            handleSubmit={this.handleSubmit}
            addCard={this.addCard}
            removeCard={this.removeCard} />;
    }
}
