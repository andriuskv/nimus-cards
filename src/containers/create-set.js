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

    handleSubmit = event => {
        const title = event.target.elements.title.value.trim();

        event.preventDefault();

        if (!title) {
            this.showMessage("Please specify set title");
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
        if (!id) {
            return;
        }

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

    handleFileUpload = (target, index, side, type) => {
        const set = Object.assign({}, this.state.set);
        const card = set.cards[index];
        const cardSide = card[side];
        const [file] = target.files;

        if (file.type.split("/")[0] === type) {
            cardSide.attachment = Object.assign({}, { type, file });
        }
        else {
            cardSide.toolboxMessage = `File is not an ${type}`;
        }
        this.setState({ set });

        if (cardSide.toolboxMessage) {
            setTimeout(() => {
                cardSide.toolboxMessage = "";
                this.setState({ set });
            }, 3200);
        }
        target.value = "";
    }

    render() {
        return <CreateSet
            set={this.state.set}
            message={this.state.message}
            handleSubmit={this.handleSubmit}
            handleInput={this.handleInput}
            addCard={this.addCard}
            removeCard={this.removeCard}
            handleFileUpload={this.handleFileUpload} />;
    }
}
