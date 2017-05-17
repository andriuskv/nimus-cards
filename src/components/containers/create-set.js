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
            cards: [{
                id: this.getRandomString(),
                front: "",
                back: ""
            }]
        }, state);
    }

    handleSubmit = event => {
        const set = Object.assign({}, this.state.set);
        const containsEmptySide = set.cards.some(({ front, back }) => !front && back || !back && front);

        event.preventDefault();

        if (!containsEmptySide) {
            set.cards = set.cards.filter(card => card.front || card.back);

            if (!set.cards.length) {
                this.setState({ message: "Please fill in at least one card" });

                clearTimeout(this.messageTimeout);
                this.messageTimeout = setTimeout(() => {
                    this.setState({ message: "" });
                }, 3200);
                return;
            }
            this.props.history.push({
                pathname: "/flashcards",
                state: set
            });
        }
    }

    getNewCard = ({ target }) => {
        const set = Object.assign({}, this.state.set);

        set.cards.push({
            id: this.getRandomString(),
            front: "",
            back: ""
        });

        this.setState({ set }, () => {
            target.scrollIntoView();
        });
    }

    handleChange = ({ target: { value, id } }) => {
        const set = Object.assign({}, this.state.set);

        if (id === "title") {
            set.title = value;
        }
        else {
            const [name, index] = id.split("-");

            set.cards[index][name] = value;
        }
        this.setState({ set });
    }

    removeCard = index => {
        const set = Object.assign({}, this.state.set);

        set.cards.splice(index, 1);
        this.setState({ set });
    }

    switchSide = (index, side) => {
        const card = this.state.set.cards[index];
        card.visibleSide = side === "front" ? "back" : "front";

        this.setState({ set: this.state.set });
    }

    render() {
        return <CreateSet
            set={this.state.set}
            message={this.state.message}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            getNewCard={this.getNewCard}
            removeCard = {this.removeCard}
            switchSide = {this.switchSide} />;
    }
}
