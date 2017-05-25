import React from "react";
import CreateSet from "../views/create-set";

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

    handleSubmit = event => {
        const title = event.target.elements.title.value.trim();

        event.preventDefault();

        if (!title) {
            this.showMessage("Please specify set title");
            return;
        }
        const set = Object.assign({}, this.state.set);
        const containsEmptySide = set.cards.some(({ front, back }) => !front && back || !back && front);
        set.title = title;

        if (!containsEmptySide) {
            set.cards = set.cards.filter(card => card.front || card.back);

            if (!set.cards.length) {
                this.showMessage("Please fill in at least one card");
                return;
            }
            this.props.history.push({
                pathname: "/flashcards",
                state: set
            });
        }
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

        set.cards.push(this.getNewCard());

        this.setState({ set }, () => {
            target.scrollIntoView();
        });
    }

    handleInput = ({ target: { id, textContent } }) => {
        const set = Object.assign({}, this.state.set);
        const [side, index] = id.split("-");
        const card = set.cards[index];

        if (card[side].text !== textContent) {
            card[side].text = textContent;
            this.setState({ set });
        }
    }

    removeCard = index => {
        const set = Object.assign({}, this.state.set);

        set.cards.splice(index, 1);
        this.setState({ set });
    }

    handleImageUpload = (index, side, image) => {
        const set = Object.assign({}, this.state.set);
        const card = set.cards[index];

        card[side].image = image;
        this.setState({ set });
    }

    render() {
        return <CreateSet
            set={this.state.set}
            message={this.state.message}
            handleSubmit={this.handleSubmit}
            handleInput={this.handleInput}
            addCard={this.addCard}
            removeCard={this.removeCard}
            handleImageUpload={this.handleImageUpload} />;
    }
}
